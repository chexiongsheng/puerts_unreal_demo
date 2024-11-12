/*
* Tencent is pleased to support the open source community by making Puerts available.
* Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
* Puerts is licensed under the BSD 3-Clause License, except for the third-party components listed in the file 'LICENSE' which may be subject to their corresponding license terms.
* This file is subject to the terms and conditions defined in file 'LICENSE', which is part of this source code package.
*/

// gen by puerts gen tools

{{'#include "CoreMinimal.h"'}}
{{'#include "UsingTypeDecl.hpp"'}}

UsingUStruct({{type.spelling}});

struct AutoRegisterFor{{type.spelling}}
{
    AutoRegisterFor{{type.spelling}}()
    {
        puerts::DefineClass<{{type.spelling}}>()
            .Constructor(CombineConstructors(
            {%- for ctor in type.constructors %}
            MakeConstructor({{type.spelling}}{% for parameter in ctor.parameters %}, {{parameter.original_decl_type}}{% endfor %}){% if not loop.last %},{% endif %}
            {%- endfor %}
            ))
            {%- for field in type.fields %}
            {%- if not field.is_const %}
            .Property("{{field.spelling}}", MakeProperty(&{{type.spelling}}::{{field.spelling}}))
            {%- else %}
            .Property("{{field.spelling}}", MakeReadonlyProperty(&{{type.spelling}}::{{field.spelling}}))
            {%- endif %}
            {%- endfor %}
            
            {%- for method in type.methods if not method.is_blocked %}
            {%- if method.overloads | length == 1 %}
            {%- if method.spelling in ['op_UnaryNegation', 'set_Item', 'get_Item', 'ToDirectionAndLength', 'GetSafeScaleReciprocal'] %}
            .{%if method.is_static%}Function{%else%}Method{%endif%}("{{method.spelling}}", SelectFunction({{method.overloads[0].signature}}, &{{type.spelling}}::{{method.org_spelling}}))
            {%- else %}
            .{%if method.is_static%}Function{%else%}Method{%endif%}("{{method.spelling}}", MakeFunction(&{{type.spelling}}::{{method.org_spelling}}))
            {%- endif %}
            {%- else %}
            .{%if method.is_static%}Function{%else%}Method{%endif%}("{{method.spelling}}", CombineOverloads(
                {%- for overload in method.overloads %}
                MakeOverload({{overload.signature}}, &{{type.spelling}}::{{overload.org_spelling}}){% if not loop.last %},{% endif %}
                {%- endfor %}
            ))
            {%- endif %}
            {%- endfor %}
            .Register();
        
    }
};

AutoRegisterFor{{type.spelling}} _AutoRegisterFor{{type.spelling}}_;