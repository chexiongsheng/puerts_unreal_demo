{%- macro get_v8_value(Info, index, is_out) -%}
    {%- if is_out -%}
    puerts::DataTransfer::UnRef(Isolate, Info[{{index}}])
    {%- else -%}
    Info[{{index}}]
    {%- endif -%}
{%- endmacro -%}

{%- macro gen_conditional(parameters, type) -%}
    {%- for parameter in parameters %}{% if loop.index > 1 %} && {% endif -%}
        {%- if parameter.out -%} Info[{{loop.index-1}}]->IsObject() && {%- endif %}
        {%- if parameter.is_pointer %}
            {{ get_v8_value(Info, loop.index-1, parameter.out) }}->IsObject() && 
            {%- if parameter.is_pointee_type_primitive %}
                {% if type.is_cdata %}
            puerts::DataTransfer::IsInstanceOf(Isolate, "{{parameter.variable_decl_type}}", {{ get_v8_value(Info, loop.index-1, parameter.out) }}->ToObject(Context).ToLocalChecked())
                {% else %}
            puerts::DataTransfer::IsInstanceOf<{{parameter.variable_decl_type}}>(Isolate, {{ get_v8_value(Info, loop.index-1, parameter.out) }}->ToObject(Context).ToLocalChecked())
                {% endif %}
            {%- else %}
                {% if type.is_cdata %}
            puerts::DataTransfer::IsInstanceOf(Isolate, "{{parameter.pointee_type}}", {{ get_v8_value(Info, loop.index-1, parameter.out) }}->ToObject(Context).ToLocalChecked())
                {% else %}
            puerts::DataTransfer::IsInstanceOf<{{parameter.pointee_type}}>(Isolate, {{ get_v8_value(Info, loop.index-1, parameter.out) }}->ToObject(Context).ToLocalChecked())
                {% endif %}
            {%- endif %}
        {%- elif (parameter.is_primitive_type or parameter.is_enum) %}{#- 基础类型（含字符串、enum） #}
            {{ get_v8_value(Info, loop.index-1, parameter.out) }}->{{parameter.check_v8_type}}()
        {%- elif parameter.is_object %}
            {{ get_v8_value(Info, loop.index-1, parameter.out) }}->IsObject() &&
            {% if type.is_cdata %}
            puerts::DataTransfer::IsInstanceOf(Isolate, "{{parameter.variable_decl_type}}", {{ get_v8_value(Info, loop.index-1, parameter.out) }}->ToObject(Context).ToLocalChecked())
            {% else %}
            puerts::DataTransfer::IsInstanceOf<{{parameter.variable_decl_type}}>(Isolate, {{ get_v8_value(Info, loop.index-1, parameter.out) }}->ToObject(Context).ToLocalChecked())
            {% endif %}
        {%- endif %}
    {%- endfor %}
{%- endmacro -%}

{%- macro gen_scope() -%}
    v8::Isolate* Isolate = Info.GetIsolate();
    v8::Local<v8::Context> Context = Isolate->GetCurrentContext();

{%- endmacro -%}

{%- macro gen_arguments(parameters) -%}
    {%- for parameter in parameters -%}
            {#- parameter.is_object==true表示parameter在被传递到构造函数时需要解引用，包括C++对象、非const引用（base为基础类型时除外）
                指针类型parameter，variable_decl_type自带星号 #}
            {{ "const " if parameter.is_const }}{{ parameter.variable_decl_type }}{{- "*" if parameter.is_object }} Arg{{loop.index-1}} = {%if parameter.is_enum%}{{parameter.variable_decl_type}}({%endif%}
        {%- if parameter.is_pointer -%}
            puerts::DataTransfer::GetPointerFast<{{parameter.pointee_type}}>({{ get_v8_value(Info, loop.index-1, parameter.out) }}->ToObject(Context).ToLocalChecked())
        {%- elif parameter.is_primitive_type or parameter.is_enum -%}
            {%- if parameter.v8_type == "String" -%}
                {%- if parameter.variable_decl_type == "FText"-%}
            FText::FromString(UTF8_TO_TCHAR(*(v8::String::Utf8Value(Isolate, {{ get_v8_value(Info, loop.index-1, parameter.out) }}))))
                {%- else -%}
            UTF8_TO_TCHAR(*(v8::String::Utf8Value(Isolate, {{ get_v8_value(Info, loop.index-1, parameter.out) }})))
                {%- endif -%}
            {%- elif parameter.v8_type == "Boolean" -%}
            {{ get_v8_value(Info, loop.index-1, parameter.out) }}->{{parameter.v8_type_cast_method}}(Isolate)->Value()
            {%- elif parameter.v8_type == "BigInt" -%}
            {{ get_v8_value(Info, loop.index-1, parameter.out) }}->{{parameter.v8_type_cast_method}}(Context).ToLocalChecked()->Uint64Value()
            {%- elif parameter.v8_type != "" -%}
            {{ get_v8_value(Info, loop.index-1, parameter.out) }}->{{parameter.v8_type_cast_method}}(Context).ToLocalChecked()->Value()
            {%- endif -%}
        {%- elif parameter.is_object -%}
            puerts::DataTransfer::GetPointerFast<{{parameter.variable_decl_type}}>({{ get_v8_value(Info, loop.index-1, parameter.out) }}->ToObject(Context).ToLocalChecked())
        {%- endif -%}
            {%-if parameter.is_enum%}){%endif-%}
            ;
    {%- endfor %}
{%- endmacro -%}

{%- macro gen_arguments_passing(parameters) -%}
    {%- for parameter in parameters %}
        {{- ", " if loop.index > 1 }}
        {{- "*" if parameter.is_object }}Arg{{loop.index-1}}
    {%- endfor %}
{%- endmacro -%}

{%- macro gen_update_out_params(parameters, type) -%}
    {%- for parameter in parameters %}
    {%- if parameter.out and (parameter.is_primitive_type or parameter.is_enum or parameter.is_pointer) %}
        {%- if parameter.is_pointer %}
            {%- if parameter.is_pointee_type_primitive %}
                {% if type.is_cdata %}
            puerts::DataTransfer::UpdateRef(Isolate, Info[{{loop.index-1}}], puerts::DataTransfer::FindOrAddCData(Isolate, Context, "{{parameter.variable_decl_type}}", Arg{{loop.index-1}}, true));
                {%- else %}
            puerts::DataTransfer::UpdateRef(Isolate, Info[{{loop.index-1}}], puerts::DataTransfer::FindOrAddStruct<{{parameter.variable_decl_type}}>(Isolate, Context, Arg{{loop.index-1}}, true));
                {% endif %}
            {%- else %}
                {% if type.is_cdata %}
            puerts::DataTransfer::UpdateRef(Isolate, Info[{{loop.index-1}}], puerts::DataTransfer::FindOrAddCData(Isolate, Context, "{{parameter.pointee_type}}", Arg{{loop.index-1}}, true));
                {%- else %}
            puerts::DataTransfer::UpdateRef(Isolate, Info[{{loop.index-1}}], puerts::DataTransfer::FindOrAddStruct<{{parameter.pointee_type}}>(Isolate, Context, Arg{{loop.index-1}}, true));
                {% endif %}
            {%- endif %}
        {%- elif parameter.v8_type == "String" %}
            {%- if parameter.variable_decl_type == "FName" or parameter.variable_decl_type == "FText" -%}
            puerts::DataTransfer::UpdateRef(Isolate, Info[{{loop.index-1}}], v8::String::NewFromTwoByte(Isolate, (const uint16_t *)*(Arg{{loop.index-1}}.ToString()), v8::NewStringType::kNormal).ToLocalChecked());
            {%- else -%}
            puerts::DataTransfer::UpdateRef(Isolate, Info[{{loop.index-1}}], v8::String::NewFromTwoByte(Isolate, (const uint16_t *)*Arg{{loop.index-1}}, v8::NewStringType::kNormal).ToLocalChecked());
            {%- endif -%}
        {%- else %}
            puerts::DataTransfer::UpdateRef(Isolate, Info[{{loop.index-1}}], v8::{{parameter.v8_type}}::New(Isolate, Arg{{loop.index-1}}));
        {%- endif %}
    {%- endif %}
    {%- endfor %}
{%- endmacro -%}