{%- import "auxiliary_macro.tpl" as macros -%}

static void _{{type.spelling}}{{field.spelling}}Get_(const v8::FunctionCallbackInfo<v8::Value>& Info)
{
    {{ macros.gen_scope() }}

    auto Self = puerts::DataTransfer::GetPointerFast<{{type.spelling}}>(Info.Holder());
    
    if (!Self) {
        puerts::DataTransfer::ThrowException(Isolate, "[{{type.spelling}}::{{field.spelling}}] Attempt to access a NULL self pointer");
        return;
    }

    auto V8Result = 
    {%- if field.is_object -%}
        {% if type.is_cdata %}
    puerts::DataTransfer::FindOrAddCData(Isolate, Context, "{{field.variable_decl_type}}", &(Self->{{field.spelling}}), true);
        {%- else %}
    puerts::DataTransfer::FindOrAddStruct<{{field.variable_decl_type}}>(Isolate, Context, &(Self->{{field.spelling}}), true);
        {% endif %}
    {%- elif field.is_pointer -%}
        {%- if field.is_pointee_type_primitive -%}
            {% if type.is_cdata %}
    puerts::DataTransfer::FindOrAddCData(Isolate, Context, "{{field.variable_decl_type}}", Self->{{field.spelling}}, true);
            {%- else %}
    puerts::DataTransfer::FindOrAddStruct<{{field.variable_decl_type}}>(Isolate, Context, Self->{{field.spelling}}, true);
            {% endif %}
        {%- else -%}
            {% if type.is_cdata %}
    puerts::DataTransfer::FindOrAddCData(Isolate, Context, "{{field.pointee_type}}", Self->{{field.spelling}}, true);
            {%- else %}
    puerts::DataTransfer::FindOrAddStruct<{{field.pointee_type}}>(Isolate, Context, Self->{{field.spelling}}, true);
            {% endif %}
        {%- endif -%}
    {%- elif field.v8_type == "String" -%}
        {%- if field.variable_decl_type == "FName" or field.variable_decl_type == "FText" -%}
    v8::String::NewFromUtf8(Isolate, TCHAR_TO_UTF8(*(Self->{{field.spelling}}.ToString())), v8::NewStringType::kNormal).ToLocalChecked();
        {%- else -%}
    v8::String::NewFromUtf8(Isolate, TCHAR_TO_UTF8(*Self->{{field.spelling}}), v8::NewStringType::kNormal).ToLocalChecked();
        {%- endif -%}
    {%- elif field.v8_type != "" -%}
    v8::{{field.v8_type}}::New(Isolate, {%if field.is_enum%}int32(Self->{{field.spelling}}){%else%}Self->{{field.spelling}}{%endif%});
    {%- endif %}
    puerts::DataTransfer::LinkOuter<{{type.spelling}}, {{field.variable_decl_type}}>(Context, Info.Holder(), V8Result);
    Info.GetReturnValue().Set(V8Result);
}

{%- if not field.is_const %}
static void _{{type.spelling}}{{field.spelling}}Set_(const v8::FunctionCallbackInfo<v8::Value>& Info)
{
    {{ macros.gen_scope() }}

    auto Self = puerts::DataTransfer::GetPointerFast<{{type.spelling}}>(Info.Holder());
    if (!Self) {
        puerts::DataTransfer::ThrowException(Isolate, "[{{type.spelling}}::{{field.spelling}}] Attempt to access a NULL self pointer");
        return;
    }
    auto Value = Info[0];

    Self->{{field.spelling}} =
    {%- if field.is_object -%}
    *puerts::DataTransfer::GetPointerFast<{{field.variable_decl_type}}>(Value->ToObject(Context).ToLocalChecked());
    {%- elif field.is_pointer -%}
    puerts::DataTransfer::GetPointerFast<{{field.pointee_type}}>(Value->ToObject(Context).ToLocalChecked());
    {%- elif field.v8_type == "String" -%}
        {%- if field.variable_decl_type == "FText"-%}
        FText::FromString(UTF8_TO_TCHAR(*(v8::String::Utf8Value(Isolate, Value))));
        {%- else -%}
        UTF8_TO_TCHAR(*(v8::String::Utf8Value(Isolate, Value)));
        {%- endif -%}
    {%- elif field.v8_type != "" -%}
        {%- if field.v8_type == "Boolean" -%}
        Value->{{field.v8_type_cast_method}}(Isolate)->Value();
        {%- elif field.v8_type == "BigInt" -%}
        Value->{{field.v8_type_cast_method}}(Context).ToLocalChecked()->Uint64Value();
        {%- else -%}
            {%- if field.is_enum -%}
        {{field.variable_decl_type}}(Value->{{field.v8_type_cast_method}}(Context).ToLocalChecked()->Value());
            {%- else -%}
        Value->{{field.v8_type_cast_method}}(Context).ToLocalChecked()->Value();
            {%- endif -%}
        {%- endif -%}
    {%- endif %}
}
{%- endif %}