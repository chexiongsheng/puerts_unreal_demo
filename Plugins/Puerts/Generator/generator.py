# -*- coding: utf-8 -*


from clang.cindex import Index, CursorKind, TokenKind, Diagnostic, AccessSpecifier, TypeKind, Type, AvailabilityKind
from pprint import pprint
from jinja2 import Environment, PackageLoader
import time
import os
import ntpath
import re

OPERATOR_OVERLOADING_RE =  re.compile('^operator([^a-zA-Z0-9_]+)')

def get_diagnostic_info(diag):
    return { 'severity' : diag.severity,
             'location' : diag.location,
             'spelling' : diag.spelling,
             'ranges' : diag.ranges,
             'fixits' : diag.fixits }
             
def cursor_tree_filter(node, filter = None):
    if filter is None or filter(node):
        yield node
    for c in node.get_children():
        for n in cursor_tree_filter(c, filter):
            yield n
            
def iterable_is_empty(iter):
    for _ in iter:
        return False
    return True
            
def unsupported_method_info(method):
   return {
        'unsupported': True,
        'spelling' : method.spelling,
        'location' : method.location,
        'signature' : method.type.spelling,
    }

def is_enum(type):
    if type.kind == TypeKind.TYPEDEF:
        return is_enum(type.get_canonical())
    if type.kind in [TypeKind.LVALUEREFERENCE, TypeKind.RVALUEREFERENCE]:
        pointee_type = type.get_pointee()
        if pointee_type.kind == TypeKind.POINTER:
            return is_enum(pointee_type.get_pointee())
        else:
            return is_enum(pointee_type)
    return is_enum(type.get_declaration().type) if type.kind == TypeKind.ELABORATED else (type.kind == TypeKind.ENUM)

def strip_name(name):
    return re.sub(r'(^class\s*)|(^struct\s*)', '', re.sub(r'(^const\s*)|(\s*const$)', '', name))

# 返回指针、基础类型、复杂类型
def get_type_name(type):
    if type.kind == TypeKind.TYPEDEF and type.get_declaration().access_specifier in [AccessSpecifier.PROTECTED, AccessSpecifier.PRIVATE]: #这种写法，private: typedef TInterval<ElementType> Super;
        return get_type_name(type.get_canonical())
    if type.kind in [TypeKind.LVALUEREFERENCE, TypeKind.RVALUEREFERENCE]:
        pointee_type = type.get_pointee()
        if pointee_type.kind == TypeKind.POINTER:
            return strip_name(pointee_type.spelling)
        else:
            return get_type_name(pointee_type)
    return strip_name(type.spelling)

def get_raw_type_name(type):
    if type.kind == TypeKind.TYPEDEF:
        return get_raw_type_name(type.get_canonical())
    if type.kind in [TypeKind.LVALUEREFERENCE, TypeKind.RVALUEREFERENCE]:
        pointee_type = type.get_pointee()
        if pointee_type.kind == TypeKind.POINTER:
            return strip_name(pointee_type.spelling)
        else:
            return get_raw_type_name(pointee_type)
    return strip_name(type.spelling)

#排除UE通过宏声明的一些内部方法，后续可能放开
def is_generated_method(method): #GENERATED_BODY
    if not iterable_is_empty(method.get_tokens()):#inline or macro
        return False
    f = open(method.location.file.name)
    f.seek(method.location.offset)
    check = f.read(51)
    f.close()
    return check.startswith('GENERATED_BODY') or check.startswith('DECLARE_CLASS') or check.startswith('DEFINE_DEFAULT_OBJECT_INITIALIZER_CONSTRUCTOR_CALL') or check.startswith('DECLARE_FUNCTION')
    
primitive_type = set([
    "bool",

    "char",
    "signed char",
    "unsigned char",
    "char8_t",
    "char16_t",
    "wchar_t",
    "char32_t",

    "short",
    "short int",
    "signed short",
    "signed short int",
    "unsigned short",
    "unsigned short int",

    "int",
    "int32_t",
    "signed",
    "signed int",
    "long",
    "long int",
    "signed long",
    "signed long int",

    "uint32_t",
    "unsigned",
    "unsigned int",
    "unsigned long",
    "unsigned long int",

    "int64_t",
    "long long",
    "long long int",
    
    "uint64_t",
    "unsigned long long",
    "unsigned long long int",
    
    "float",
    "double",
    "long double",

    "FString",
    "FText",
    "FName",
    ])

def is_primitive_type(t):
    return (t if type(t) is str else get_raw_type_name(t)) in primitive_type
    
def is_pointer(type):
    if type.kind == TypeKind.TYPEDEF:
        return is_pointer(type.get_canonical())
    if type.kind == TypeKind.LVALUEREFERENCE:
        return is_pointer(type.get_pointee())
    return type.kind == TypeKind.POINTER

def is_object(type):
    return not (is_primitive_type(type) or is_pointer(type) or is_enum(type))

def is_out(type):
    return type.kind == TypeKind.LVALUEREFERENCE and not type.get_pointee().is_const_qualified()

# 获得最外层指针所指的类型，比如type类型为int*&，get_pointee_name(type)会返回"int"
def get_pointee_name(type):
    if type.kind == TypeKind.TYPEDEF:
        return get_pointee_name(type.get_canonical())
    if type.kind in [TypeKind.LVALUEREFERENCE, TypeKind.RVALUEREFERENCE]:
        pointee_type = type.get_pointee()
        if pointee_type.kind == TypeKind.POINTER:
            return strip_name(pointee_type.get_pointee().spelling)
        else:
            return get_pointee_name(pointee_type)
    elif type.kind == TypeKind.POINTER:
        return strip_name(type.get_pointee().spelling)
    else:
        return ""

# 获得最外层引用所引用的类型，比如type类型为int*&，get_ref_name(type)会返回"int*"
def get_ref_name(type):
    if type.kind == TypeKind.TYPEDEF:
        return get_ref_name(type.get_canonical())
    if type.kind in [TypeKind.LVALUEREFERENCE, TypeKind.RVALUEREFERENCE]:
        if type.kind != TypeKind.POINTER:
            return strip_name(type.get_pointee().spelling)
        else:
            return get_ref_name(type)
    else:
        return ""

def GetKeyOfValue(map, value):
    for k, v in map.items():
        if value in v:
            return k
    return None

CPP2V8_types_map = dict({
    "BigInt" : ["uint64_t", "unsigned long long", "unsigned long long int"],
    "Number" : ["float", "double", "long double"],
    "Integer" : ["int64_t", "long long", "long long int",
                 "uint32_t", "unsigned", "unsigned int", "unsigned long", "unsigned long int",
                 "int32_t", "signed", "signed int", "int", "long", "signed long", "long int", "signed long int",
                 "char", "signed char", "unsigned char", "char8_t", "char16_t", "wchar_t", "char32_t",
                 "short", "short int", "signed short", "signed short int", "unsigned short", "unsigned short int"],
    "Boolean" : ["bool"],
    "String" : ["FString", "FText", "FName"],
    # 字符串、enum、Object要特殊处理
})

def get_v8_type(type):
    raw_type = get_raw_type_name(type.get_canonical())
    ret = GetKeyOfValue(CPP2V8_types_map, raw_type)
    if ret:
        return ret
    if is_enum(type.get_canonical()):
        return "Int32"
    elif is_object(type.get_canonical()):
        return "Object"
    else:
        return ""

def get_v8_type_cast_method(type):
    v8_type = get_v8_type(type)
    if v8_type:
        return "To" + v8_type
    else:
        return ""

def get_check_v8_type_method(type):
    v8_type = get_v8_type(type)
    if v8_type in ["Integer", "Uint32", "Int32"]:
        return "Is" + "Number"  # 对这些整型，也用Number来判断，减少分支情况
    elif v8_type:
        return "Is" + v8_type
    else:
        return ""

Ptr2Ts_types_map = dict({
    # 将基础类型的指针映射为TS类型
    "UInt64Ptr" : ["uint64_t", "unsigned long long", "unsigned long long int"],
    "FloatPtr" : ["float"], 
    "DoublePtr" : ["double", "long double"],
    "Int64Ptr" : ["int64_t", "long long", "long long int"],
    "UInt32Ptr" : ["uint32_t", "unsigned", "unsigned int", "unsigned long", "unsigned long int"],
    "Int32Ptr" : ["int32_t", "signed", "signed int", "int", "long", "signed long", "long int", "signed long int", "char32_t", "enum"],
    "CharPtr" : ["char", "signed char", "unsigned char", "char8_t"],
    "ShortPtr" : ["short", "short int", "signed short", "signed short int", "unsigned short", "unsigned short int", "char16_t", "wchar_t"],
    "BoolPtr" : ["bool"],
    "StringPtr" : ["FString", "FText", "FName"],
    # enum要特殊处理（归类到了Int32Ptr）
})

# 保存生成模板类型时的模板参数
template_arg_types = []

def is_template(n):
    return n.get_num_template_arguments() != -1

def apart_namespace(name):
    parts = name.split("::")
    namespaces = parts[:-1]
    typename = parts[-1:]
    return namespaces, typename[0]

def get_ts_type(node, gen_type_names):
    ts_type = ""
    if is_pointer(node):
        pointee_name = get_pointee_name(node.get_canonical())
        if is_primitive_type(pointee_name):
            if is_enum(node):
                ts_type = GetKeyOfValue(Ptr2Ts_types_map, "enum")
            else:
                ts_type = GetKeyOfValue(Ptr2Ts_types_map, pointee_name)
        else:
            ts_type = pointee_name
    else:
        v8_type = get_v8_type(node)
        if v8_type in ["Integer", "Uint32", "Int32"]:
            ts_type = "number"
        elif v8_type == "BigInt":
            ts_type = v8_type
        elif v8_type:
            ts_type = v8_type.lower()
        else:
            ts_type = "any"
    # 对象类型的ts type应该为具体类型名字
    if ts_type == "object":
        if is_template(node) or (node.kind == TypeKind.LVALUEREFERENCE and is_template(node.get_pointee())):    # 包括模板和它的const左值引用
            type_def = node.get_canonical()                             # 还原typedef
            if node.kind == TypeKind.LVALUEREFERENCE:
                type_def = node.get_pointee().get_canonical()
            ret = re.match(r"(\w+)<.*>", strip_name(type_def.spelling)) # 去掉const
            ts_type = ret.groups()[0] + "<"
            for i in range(type_def.get_num_template_arguments()):
                if i > 0:
                    ts_type = ts_type + ", "
                arg_type = type_def.get_template_argument_type(i)       # 对于偏特化的模板参数，目前直接用any作为ts的对应类型
                arg_ts_type = ""
                if arg_type.kind != TypeKind.INVALID:
                    template_arg_types.append(arg_type)                 # 保存类型参数，后续会生成对应的声明
                    arg_ts_type = get_ts_type(arg_type, gen_type_names)
                if not arg_ts_type:
                    arg_ts_type = "any"
                ts_type = ts_type + arg_ts_type
            ts_type = ts_type + ">"
        else:
            ts_type = get_type_name(node)
    namespaces, innerist = apart_namespace(ts_type)
    if namespaces:
        s = "."
        ts_type = s.join(namespaces) + "." + innerist
    if ts_type == "UObject":
        ts_type = "Object"
    if ts_type == "UClass":
        ts_type = "Class"
    if ts_type in gen_type_names:
        ts_type = ts_type[1:]
    if is_out(node):
        ts_type = "$Ref<" + ts_type + ">"
    return ts_type

class Generator:
    _gen_type_usr_list = []
    
    _usr_to_type = {}
    
    _usr_to_not_gen_object_type = {}
    
    _super_type_map = {}
    
    _member_blacklist = {}
    
    _supported_unary_operators = {}

    _supported_binary_operators = {}
    
    _supported_assign_operators = {}
    
    def __init__(self, compile_args, src, select, supported_unary_operators = {}, supported_binary_operators = {}, supported_assign_operators = {}, primary_types= {}, unsupported_methods = {}, is_cdata = False):
        self._supported_unary_operators = supported_unary_operators
        self._supported_binary_operators = supported_binary_operators
        self._supported_assign_operators = supported_assign_operators
        self._unsupported_methods = unsupported_methods
        self._is_cdata = is_cdata;
        index = Index.create()
        start = time.time()
        tu = index.parse(src, compile_args, options = 0x40)
        end = time.time()
        diagnostics = [get_diagnostic_info(d) for d in  tu.diagnostics if d.severity > Diagnostic.Warning]
        if len(diagnostics) > 0:
            pprint((tu.spelling, 'diagnostics', diagnostics))
            return
        else:
            print '0 error, 0 warning in', tu.spelling, 'compile using', end - start, 'seconds'
        
        start = time.time()
        self._gen_type_list = list(select(tu.cursor))
        end = time.time()
        print 'select using', end - start, 'seconds'
        
        self.gen_type_names = set()
        for type in self._gen_type_list:
            self._gen_type_usr_list.append(type.get_usr())
            self.register_type_info(type)
            self.gen_type_names.add(type.spelling)
            
        self.env = Environment(
            loader=PackageLoader('generator', 'templates'),
            line_statement_prefix  = '#'
        )
        
        self.primary_types = primary_types
        
        self._type_info_list = [self.get_type_info(type) for type in self._gen_type_list]
                
        #for type in self._gen_type_list:
        #   print type.spelling
        
        #for key, value in self._usr_to_not_gen_object_type.iteritems():
        #    print key, value.spelling
        
    def register_type_info(self, type):
        usr = type.get_usr()
        assert usr
        if usr not in self._usr_to_type:
            self._usr_to_type[usr] = type
            bases = []
            for child in type.get_children():
                if child.kind == CursorKind.CXX_BASE_SPECIFIER:
                    bases.append(child.get_definition().get_usr())
                    bases += self.register_type_info(child.get_definition())
                else:
                    break
            self._super_type_map[usr] = bases
        return self._super_type_map[usr]
        
    def get_parameter_info(self, parameter):
        parameter_type = parameter if type(parameter) is Type else parameter.type
        b_primitive_type = is_primitive_type(parameter_type)
        b_pointer = is_pointer(parameter_type)
        b_enum = is_enum(parameter_type)
        b_out = is_out(parameter_type)

        typename = get_type_name(parameter_type)
        namespaces, innerist = apart_namespace(typename)
        b_in_namespace = False
        if namespaces:
            b_in_namespace = True

        return {
            "spelling" : parameter.spelling,
            'out' : b_out,
            'variable_decl_type' : typename,
            'original_decl_type' : parameter_type.spelling,
            'is_primitive_type': b_primitive_type,
            'is_pointer': b_pointer,
            'is_enum': b_enum,
            'is_object': not b_primitive_type and not b_pointer and not b_enum,
            'is_void' : parameter_type.kind == TypeKind.VOID,

            'pointee_type' : get_pointee_name(parameter_type),
            'v8_type_cast_method' : get_v8_type_cast_method(parameter_type),
            'v8_type' : get_v8_type(parameter_type),
            'check_v8_type' : get_check_v8_type_method(parameter_type),
            'is_const' : "const" in parameter_type.spelling,
            'is_pointee_type_primitive' : is_primitive_type(get_pointee_name(parameter_type.get_canonical())),
            'ts_type' : get_ts_type(parameter_type, self.gen_type_names),

            'in_namespace': b_in_namespace,
            'namespaces' : namespaces,
            'innerist' : innerist
        }
        
    def get_result_info(self, result_type):
        if result_type.kind == TypeKind.VOID:
            return {"is_void" : True}
            
        b_primitive_type =  is_primitive_type(result_type)
        b_pointer = is_pointer(result_type)
        b_enum = is_enum(result_type)

        typename = get_type_name(result_type)
        namespaces, innerist = apart_namespace(typename)
        b_in_namespace = False
        if namespaces:
            b_in_namespace = True
        
        return {
            "is_void" : False,
            'variable_decl_type' : typename,
            'is_primitive_type': b_primitive_type,
            'is_pointer': b_pointer,
            'is_enum': b_enum,
            'is_object': not b_primitive_type and not b_pointer and not b_enum,
            'v8_type_cast_method' : get_v8_type_cast_method(result_type),
            'v8_type' : get_v8_type(result_type),
            'check_v8_type' : get_check_v8_type_method(result_type),
            'pointee_type' : get_pointee_name(result_type),
            'is_pointee_type_primitive' : is_primitive_type(get_pointee_name(result_type.get_canonical())),
            'ts_type' : get_ts_type(result_type, self.gen_type_names),

            'in_namespace': b_in_namespace,
            'namespaces' : namespaces,
            'innerist' : innerist
        }
        
    def get_overload_info(self, method):
        #if method_unsupported(method):
        #    return unsupported_method_info(method)
            
        is_static = method.kind == CursorKind.CXX_METHOD and method.is_static_method()
        
        parameters = [self.get_parameter_info(arg) for arg in method.get_arguments()]
        
        is_const = method.is_const_method()
        
        spelling = method.spelling
        operator = None
        kotlin_operator = None
        binary_operator = False
        unary_operator = False
        assign_operator = False
        indexer = False
        
        is_overload_operator = False
        operator_method = ""
        mo = OPERATOR_OVERLOADING_RE.match(spelling)
        
        if mo:
            operator = mo.group(1)
            if len(parameters) == 0:
                if operator in self._supported_unary_operators:
                    unary_operator = True
                    spelling = self._supported_unary_operators[operator]
            elif len(parameters) == 1:
                if operator in self._supported_binary_operators:
                    binary_operator = True
                    spelling = self._supported_binary_operators[operator]
                elif operator in self._supported_assign_operators:
                    assign_operator = True
                    spelling = self._supported_assign_operators[operator]
                elif operator == '[]':
                    indexer = True
                    spelling = 'get_Item' if is_const else 'set_Item'

            if not binary_operator and not unary_operator and not assign_operator and not indexer:
                return unsupported_method_info(method)
            else:
                is_overload_operator = True
                operator_method = "operator" + operator
        

        result_type_info = self.get_result_info(method.result_type)
        
        unsupported = False
        
        if 'is_object' in result_type_info and result_type_info['is_object']:
            result_type = method.result_type
            if result_type.kind == TypeKind.LVALUEREFERENCE: result_type = result_type.get_pointee()
            result_type_usr = result_type.get_declaration().get_usr()
            
            if result_type_usr not in self._gen_type_usr_list:
                self._usr_to_not_gen_object_type[result_type_usr] = result_type
                unsupported = True
        
        is_void = result_type_info["is_void"] or (indexer and not is_const)

        return {
                   'spelling' : spelling,
                   'unsupported' : unsupported,
                   'is_static' : is_static,
                   'parameters' : parameters,
                   'return_type': result_type_info,
                   'location' : method.location,
                   'signature' : method.type.spelling,
                   'is_const': is_const,
                   'operator' : operator,
                   'binary_operator' : binary_operator,
                   'unary_operator' : unary_operator,
                   'assign_operator' : assign_operator,
                   'indexer' : indexer,
                   'is_void' : is_void,
                   'return_counter' : (0 if is_void else 1)  + sum(1 for x in parameters if x['out']),
                   'is_overload_operator' : is_overload_operator,
                   'operator_method' : operator_method,
                   'is_blocked' : False
               }
    
    def get_field_info(self, field):
        return self.get_parameter_info(field)

    def get_type_info(self, cursor):
        children = [n for n in cursor.get_children()]
        
        super_type = None #if base type in _gen_type_list
        for super_usr in self._super_type_map[cursor.get_usr()]:
            if super_usr in self._gen_type_usr_list:
                super_type = self._usr_to_type[super_usr].type
                break
        
        methods = []
        method_map = {}
        unsupported_methods = []
        constructors = []
        fields = []
        static_fields = []
        
        for c in filter(lambda n: n.kind in [CursorKind.CXX_METHOD, CursorKind.CONSTRUCTOR, CursorKind.FIELD_DECL, CursorKind.VAR_DECL] and n.access_specifier == AccessSpecifier.PUBLIC and n.availability == AvailabilityKind.AVAILABLE and (not is_generated_method(n)), children):
            if cursor.spelling in self._member_blacklist and c.spelling in self._member_blacklist[cursor.spelling]:
                continue
            if c.kind == CursorKind.FIELD_DECL:
                fields.append(self.get_field_info(c))
                continue
            if c.kind == CursorKind.VAR_DECL:
                static_fields.append(self.get_field_info(c))
                continue
            
            overload_info = self.get_overload_info(c)

            # 过滤不支持的方法，它们可能会导致链接问题
            for class_name, method_names in self._unsupported_methods.items():
                if class_name == cursor.spelling and overload_info["spelling"] in method_names:
                    overload_info["unsupported"] = True

            if overload_info["unsupported"]:
                unsupported_methods.append(overload_info)
            else:
                if c.kind == CursorKind.CONSTRUCTOR:
                    constructors.append(overload_info)
                else:
                    method_key = ("S_" if overload_info["is_static"] else "M_") + overload_info["spelling"]
                    method = method_map[method_key]  if method_key in method_map else {"method_key" : method_key, 'spelling': overload_info["spelling"], "overloads" : [], "is_static": overload_info["is_static"]}
                    if method_key not in method_map:
                        methods.append(method)
                        method_map[method_key] = method
                
                    method["overloads"].append(overload_info)

        return { 
                   'spelling' : cursor.spelling,
                   'ts_type' : cursor.spelling[1:] if not self._is_cdata else cursor.spelling,
                   #'is_uobject' : is_assignable_from( 'UObject', cursor),
                   'super_type' : super_type,
                   'fields' : fields,
                   'static_fields': static_fields,
                   'methods' : methods,#static and non-static
                   'constructors' : constructors,
                   'unsupported_methods': unsupported_methods,
                   'is_cdata': self._is_cdata
               }
               
    def gen(self, tpl_name, write_to, function_blacklist):
        def is_blocked(function_info, blocked_functions):
            for blocked_function in blocked_functions:
                params = function_info["parameters"]
                blocked_function_params = blocked_function["argument_type"]
                if function_info["spelling"] == blocked_function["function_name"] and len(blocked_function_params) == 1 and blocked_function_params[0] == "*":
                    return True
                is_match = True
                if function_info["spelling"] == blocked_function["function_name"] and len(params) == len(blocked_function_params):
                    for i in range(len(function_info["parameters"])):
                        if params[i]["original_decl_type"] != blocked_function_params[i]:
                            is_match = False
                            break
                    if is_match:
                        # print "Blocked:", function_info["spelling"], "("
                        # for param in params:
                        #     print param["original_decl_type"]
                        # print ")"
                        return True
            return False

        # 检查类型的构造函数、成员函数。对出现在function_blacklist中的函数，设置该函数"is_blocked"为true
        for type_info in self._type_info_list:
            if type_info["spelling"] in function_blacklist:
                blocked_functions = function_blacklist[type_info["spelling"]]
                for ctor_info in type_info["constructors"]:
                    ctor_info["is_blocked"] = is_blocked(ctor_info, blocked_functions)
                for method in type_info["methods"]:
                    blocked_count = 0
                    for method_info in method["overloads"]:
                        method_info["is_blocked"] = is_blocked(method_info, blocked_functions)
                        if method_info["is_blocked"] : blocked_count = blocked_count + 1
                    if blocked_count == len(method["overloads"]):
                        method["is_blocked"] = True
                    
            template = self.env.get_template(tpl_name(type_info))   #tpl_name总是返回"struct_impl.tpl"
            write_to(type_info, template.render(type = type_info))
            
    def gen_exclude(self, tpl_name, write_to):
        typenames = set()
        for type_info in self._type_info_list:
            typenames.add(type_info["ts_type"])
                    
        template = self.env.get_template(tpl_name)
        write_to(template.render(types = list(typenames)))

    def gen_declare(self, tpl_name, write_to, ts_type_blacklist):
        # 把主要生成的类型的名字加入到typenames，用于去重
        typenames = set()
        for type_info in self._type_info_list:
            typenames.add(type_info["spelling"])

        # 筛选对象和对象指针类型
        def is_object_type(in_type):
            if in_type.get("is_pointer") and not in_type.get("is_pointee_type_primitive"):
                return True
            elif in_type.get("is_object"):
                return True
            else:
                return False
        
        def get_object_typename(in_type):
            name = ""
            if in_type.get("is_pointer"):
                name = in_type.get("pointee_type")
            else:
                name = in_type.get("variable_decl_type")
            # 同一个模板有不同的实例，名字互不相同，声明模板时只需要声明一次，因此把这些模板实例名字划归为一个
            ret = re.match(r"(\w+)<.*>", name)
            if ret:
                name = ret.groups()[0] + "<T>" # TODO - 需支持多个模板参数
            return name

        types_to_declare = dict()
        def record_types_to_declare(name, info):
            typenames.add(name)
            types_to_declare[name] = info

        # 检查每个类型的属性、构造函数参数、方法参数和方法返回值依赖的类型是否位于typenames，如果不存在则加入到typenames
        for type_info in self._type_info_list:
            for overload_info in type_info["constructors"]:
                for parameter in overload_info["parameters"]:
                    if is_object_type(parameter):
                        record_types_to_declare(get_object_typename(parameter), parameter)
            for field in type_info["fields"]:
                if is_object_type(field):
                    record_types_to_declare(get_object_typename(field), field)
            for method in type_info["methods"]:
                for overload_info in method["overloads"]:
                    for parameter in overload_info["parameters"]:
                        if is_object_type(parameter):
                            record_types_to_declare(get_object_typename(parameter), parameter)
                    return_type = overload_info["return_type"]
                    if is_object_type(return_type):
                        record_types_to_declare(get_object_typename(return_type), return_type)
            super_type = type_info["super_type"]
            if super_type:
                record_types_to_declare(super_type.spelling, super_type)
        
        # 检查先前处理属性、函数参数和返回值类型为模板时的模板参数，为它们生成type_info。如果名字不在typenames中，加入到typenames
        for arg_type in template_arg_types:
            type_info = self.get_parameter_info(arg_type)
            if is_object_type(type_info):
                record_types_to_declare(get_object_typename(type_info), type_info)

        # 处理主要生成的类型的ts声明
        unique_list = list()
        for type_info in self._type_info_list:
            if type_info["spelling"] in typenames:
                typenames.remove(type_info["spelling"])
                unique_list.append(type_info)

        # typenames剩余的类型名都是被依赖类型的名字，要为它们生成空类声明（加入到unique_list中）
        # TODO - 处理UClass和UObject
        for name in typenames:
            # 不要重复定义blacklist规定的模板
            ret = re.match(r"(\w+)<.*>", name)
            if ret:
                if ret.groups()[0] in ts_type_blacklist:
                    continue
            if name == "UObject" or name == "UClass":
                continue
            type_info = types_to_declare[name]
            if type_info:
                unique_list.append({
                    'spelling' : name,
                    'in_namespace': type_info['in_namespace'],
                    'namespaces' : type_info['namespaces'],
                    'innerist' : type_info['innerist'],
                })
            else:
                unique_list.append({
                    'spelling' : name,
                })

        template = self.env.get_template(tpl_name)
        write_to(template.render(types = unique_list))