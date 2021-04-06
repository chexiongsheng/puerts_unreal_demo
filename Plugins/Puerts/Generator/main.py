# This Python file uses the following encoding: utf-8

import os
from clang.cindex import CursorKind, Config
from ue_project import UEProj
from generator import Generator, cursor_tree_filter

sys_types = [
    "FBox2D", "FGuid", "FVector", "FVector2D", "FVector4", "FTransform", "FRotator", "FQuat", "FColor", "FLinearColor", "FIntPoint", "FIntVector",
]

custome_type = []

# 生成TS声明时的黑名单
ts_type_blacklist = ["FixSizeArray", "TArray", "TSet", "TMap"]  # 无需重新声明手动写好的声明

# 构造函数、成员函数的黑名单
function_blacklist = {
    "FTransform" : [                                            
        {
            "function_name" : "FTransform", # 安卓平台不支持该重载版本
            "argument_type" : ["const VectorRegister &", "const VectorRegister &", "const VectorRegister &"]
        },
        {
            "function_name" : "FTransform",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["const FMatrix &"]
        },
        {
            "function_name" : "SetFromMatrix",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["const FMatrix &"]
        },
        {
            "function_name" : "op_Multiply",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["const ScalarRegister &"]
        },
        {
            "function_name" : "Accumulate",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["const FTransform &", "const ScalarRegister &"]
        },
        {
            "function_name" : "AccumulateWithShortestRotation",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "AccumulateWithAdditiveScale",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "LerpTranslationScale3D",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "BlendFromIdentityAndAccumulate",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
    ],
    "FGuid" : [                                            
        {
            "function_name" : "ImportTextItem",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["const TCHAR *&", "int32", "UObject *", "FOutputDevice *"]
        },
        {
            "function_name" : "Serialize",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "ExportTextItem",#含UObject
            "argument_type" : ["*"]
        },
    ],
    "FColor" : [                                            
        {
            "function_name" : "Serialize",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
    ],
    "FIntPoint" : [                                            
        {
            "function_name" : "Serialize",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
    ],
    "FIntVector" : [
        {
            "function_name" : "Serialize",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "DivideAndRoundUp",#4.23没有
            "argument_type" : ["FIntVector", "FIntVector"] 
        },
        {
            "function_name" : "op_BitwiseOr",#4.23
            "argument_type" : ["*"]
        },
        {
            "function_name" : "op_ExclusiveOr",#4.23
            "argument_type" : ["*"]
        },
    ],
    "FVector" : [
        {
            "function_name" : "Serialize",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "NetSerialize",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "EvaluateBezier",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "GenerateClusterCenters",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "DiagnosticCheckNaN",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["const TCHAR *"]
        },
    ],
    "FVector4" : [
        {
            "function_name" : "FVector4",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["const FIntVector4 &"]
        },
        {
            "function_name" : "Serialize",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
    ],
    "FQuat" : [
        {
            "function_name" : "FQuat",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["const FMatrix &"]
        },
        {
            "function_name" : "Serialize",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "NetSerialize",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "DiagnosticCheckNaN",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["const TCHAR *"]
        },
        {
            "function_name" : "GetTwistAngle",#4.23没有
            "argument_type" : ["*"]
        },
    ],
    "FVector2D" : [
        {
            "function_name" : "FVector2D",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["float"]
        },
        {
            "function_name" : "Serialize",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "NetSerialize",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "Max",#4.21
            "argument_type" : ["*"]
        },
        {
            "function_name" : "Min",#4.21
            "argument_type" : ["*"]
        },
    ],
    "FRotator" : [
        {
            "function_name" : "Serialize",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "NetSerialize",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "SerializeCompressed",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["*"]
        },
        {
            "function_name" : "SerializeCompressedShort",
            "argument_type" : ["*"]
        },
        {
            "function_name" : "DiagnosticCheckNaN",#这函数同时有CData和UStruct，先不支持
            "argument_type" : ["const TCHAR *"]
        },
    ],
    "FLinearColor" : [
        {
            "function_name" : "FLinearColor",#FFloat16Color
            "argument_type" : ["const FFloat16Color &"]
        },
        {
            "function_name" : "EvaluateBezier",#IsInstanceOf<TArray<FLinearColor>>
            "argument_type" : ["*"]
        },
        {
            "function_name" : "MakeFromHSV8",#4.21
            "argument_type" : ["*"]
        },
        {
            "function_name" : "Serialize",
            "argument_type" : ["*"]
        },
    ],
    "FBox2D" : [
        {
            "function_name" : "FBox2D",#IsInstanceOf<TArray<FVector>>
            "argument_type" : ["const TArray<FVector2D> &"]
        },
    ],
}


def gen_selector_for_list(lst):
    def selector(root):
        for cursor in cursor_tree_filter(root):
            if cursor.kind in [CursorKind.CLASS_DECL, CursorKind.STRUCT_DECL]:
                if cursor.spelling in lst:
                    yield cursor.get_definition()
    return selector

def main():
    from optparse import OptionParser
    
    parser = OptionParser("usage: %prog [options]")
    parser.add_option("-o", "--output", dest="output",
                      help="Output directory" , default="../Source/JsEnv/Private/Gen/")
                      
    parser.add_option("-p", "--project", dest="project_path",
                      help="vc project" , default="../../../Intermediate/ProjectFiles/puerts_unreal_demo.vcxproj")
                      
    parser.add_option("-i", "--includes", dest="includes",
                      help="headers for all type" , default="GenHeaders.h")
                      
    parser.disable_interspersed_args()
    (opts, args) = parser.parse_args()

    ue_proj = UEProj(opts.project_path)
    #print ue_proj.engine_dir
    #print ue_proj.compile_args
    generator = Generator(ue_proj.compile_args, opts.output + opts.includes, gen_selector_for_list(sys_types), { "-" : "op_UnaryNegation"}, {
        "^" : "op_ExclusiveOr",
        "|" : "op_BitwiseOr",
        "+" : "op_Addition",
        "-" : "op_Subtraction",
        "*" : "op_Multiply",
        "/" : "op_Division",
        "==" : "op_Equality",
        "!=" : "op_Inequality",
        }, unsupported_methods = {
        "FTransform" : ["DebugEqualMatrix"],
        "FPrimaryAssetType" : ["ExportTextItem", "ImportTextItem", "SerializeFromMismatchedTag"],
        "FPrimaryAssetId" : ["ExportTextItem", "ImportTextItem", "SerializeFromMismatchedTag"],
        })
    
    def write_to_file(filename, content, dir = None):
        f = open(os.path.join(dir or opts.output, filename), "w")
        f.write(content)
        f.close()
        
    generator.gen(lambda type_info:"struct_impl.tpl", lambda type_info, content: write_to_file(type_info["spelling"] + "_Wrap.cpp", content), function_blacklist)
    generator.gen_exclude("exclude_header.tpl", lambda content: write_to_file("ExcludeStructs.h", content, '../Source/DeclarationGenerator/Private'))
    generator.gen_declare("ts_declare.tpl", lambda content: write_to_file("ue_s.d.ts", content, '../Typing/ue'), ts_type_blacklist)

if __name__ == '__main__':
    main()