
{%- macro gen_arguments(parameters) -%}
    {%- for parameter in parameters %}
        {{- ", " if loop.index > 1 }}
        {%- if parameter.spelling %}{{parameter.spelling}}{%else%}Param{{loop.index}}{%endif%}: {{parameter.ts_type}}
    {%- endfor -%}
{%- endmacro -%}

/// <reference path="puerts.d.ts" />
declare module "ue" {
    import {$Ref, $Nullable} from "puerts"

{%- for type in types %}
    {%- for namespace in type.namespaces %}
    namespace {{namespace}} {
    {%- endfor %}
    class {{(type.ts_type or type.spelling) if not type.namespaces else type.innerist}}{{" extends " if type.super_type}}{{type.super_type.spelling if type.super_type}} {
        {%- if (type.constructors | length) > 0 %}
        {%- for ctor in type.constructors %}
        {%- if not ctor.is_blocked %}
        constructor(
            {{-gen_arguments(ctor.parameters)-}}
        );
        {%- endif %}
        {%- endfor %}
        {%- else %}
        constructor();
        {%- endif %}

        {%- for field in type.fields %}
        {{field.spelling}}: {{field.ts_type}};
        {%- endfor %}

        {%- for method in type.methods %}
        {%- for overload in method.overloads %}
        {%- if not overload.is_blocked %}
        {{ "static " if overload.is_static }}
        {{- overload.spelling}}(
            {{-gen_arguments(overload.parameters)-}}
        ): {{overload.return_type.ts_type if overload.return_type.ts_type else "void"}};
        {%- endif %}
        {%- endfor %}
        {%- endfor %}
        {% if not type.is_cdata %}
        /**
         * @deprecated use StaticStruct instead.
         */
        static StaticClass(): ScriptStruct;
        static StaticStruct(): ScriptStruct;
        
        private __tid_{{((type.ts_type or type.spelling) if not type.namespaces else type.innerist).replace("<", "").replace(">", "")}}__: boolean;
        {% endif %}
    }
    {%- for namespace in type.namespaces %}
    }
    {%- endfor %}
{%- endfor %}

}