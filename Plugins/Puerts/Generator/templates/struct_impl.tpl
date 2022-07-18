/*
* Tencent is pleased to support the open source community by making Puerts available.
* Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
* Puerts is licensed under the BSD 3-Clause License, except for the third-party components listed in the file 'LICENSE' which may be subject to their corresponding license terms.
* This file is subject to the terms and conditions defined in file 'LICENSE', which is part of this source code package.
*/

// gen by puerts gen tools

{{'#include "GenHeaders.h"'}}
{{'#include "CoreMinimal.h"'}}
{{'#include "DataTransfer.h"'}}
{{'#include "JSClassRegister.h"'}}

{% for unsupported_method in type.unsupported_methods %}
// {{unsupported_method.location}}
// unsupported method : {{unsupported_method.spelling}} {{unsupported_method.signature}}
{% endfor %}

{% include "life_cycle_impl.tpl" %}

{%- for method in type.methods if not method.is_blocked %}
{% include "method_impl.tpl" %}
{% endfor %}

{%- for field in type.fields %}
{% include "field_impl.tpl" %}
{%- endfor %}

struct AutoRegisterFor{{type.spelling}}
{
    AutoRegisterFor{{type.spelling}}()
    {
        puerts::JSClassDefinition Def = JSClassEmptyDefinition;

        static puerts::JSPropertyInfo Properties[] = {
            {%- for field in type.fields %}
            {%- if not field.is_const %}
            {"{{field.spelling}}", _{{type.spelling}}{{field.spelling}}Get_, _{{type.spelling}}{{field.spelling}}Set_},
            {%- else %}
            {"{{field.spelling}}", _{{type.spelling}}{{field.spelling}}Get_, nullptr},
            {%- endif %}
            {%- endfor %}
            {0, 0, 0}
        };

        static puerts::JSFunctionInfo Methods[] = {
            {%- for method in type.methods if not method.is_blocked %}
            {%- if not method.is_static %}
            {"{{method.spelling}}", {{type.spelling}}{{method.method_key}}},
            {%- endif %}
            {%- endfor %}
            {0, 0}
        };

        static puerts::JSFunctionInfo Functions[] = {
            {%- for method in type.methods if not method.is_blocked %}
            {%- if method.is_static %}
            {"{{method.spelling}}", {{type.spelling}}{{method.method_key}}},
            {%- endif %}
            {%- endfor %}
            {0, 0}
        };
{% if type.is_cdata %}
        Def.CPPTypeName = "{{type.spelling}}";
        {% if type.super_type %}Def.CPPSuperTypeName = "{{type.super_type.spelling[1:]}}";{% endif %}
{% else %}
        Def.UETypeName = "{{type.spelling[1:]}}";
{% endif %}
        Def.Initialize = _{{type.spelling}}New_;
        Def.Finalize = _{{type.spelling}}Delete_;
        Def.Properties = Properties;
        Def.Methods = Methods;
        Def.Functions = Functions;

        puerts::RegisterJSClass(Def);
        
    }
};

AutoRegisterFor{{type.spelling}} _AutoRegisterFor{{type.spelling}}_;