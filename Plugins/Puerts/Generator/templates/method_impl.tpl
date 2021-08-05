{%- import "auxiliary_macro.tpl" as macros -%}

static void {{type.spelling}}{{method.method_key}}(const v8::FunctionCallbackInfo<v8::Value>& Info)
{
    {{ macros.gen_scope() }}

    {%- for overload in method.overloads %}
    {%- if not overload.is_blocked %}
    if (Info.Length() == {{overload.parameters | length}})
    {
        if ({%- if overload.parameters | length == 0 -%}
                true
            {%- else -%}
            {{ macros.gen_conditional(overload.parameters, type) }}
            {%- endif %})
        {
            {{ macros.gen_arguments(overload.parameters) }}

            {#- 调用对应函数，接收返回值 #}
            {%- if not overload.is_static%}
            auto Self = puerts::DataTransfer::GetPointerFast<{{type.spelling}}>(Info.Holder());
            if (!Self)
            {
                puerts::DataTransfer::ThrowException(Isolate, "[{{type.spelling}}::{{method.method_key}}] Attempt to access a NULL self pointer");
                return;
            }
            {%- endif%}
            {%if not overload.is_void%}auto MethodResult = {%endif%}
            {%-if not overload.is_static%}Self->{%else%}{{type.spelling}}::{%endif%}{%if overload.is_overload_operator%}{{overload.operator_method}}{%else%}{{method.spelling}}{%endif%}({{ macros.gen_arguments_passing(overload.parameters) }});

            {#- 设置v8 Info返回值、注册返回值到puerts #}
            {%- if not overload.is_void %}
            {% if overload.return_type.is_object -%}{#- 返回临时对象，应该拷贝一份使得在JS里能被正常访问，该对象需让puerts管理生命周期 -#}
            void* Ptr = new {{overload.return_type.variable_decl_type}}(MethodResult);
                {% if type.is_cdata %}
            auto V8Result = puerts::DataTransfer::FindOrAddCData(Isolate, Context, "{{overload.return_type.variable_decl_type}}", Ptr, false);
                {%- else %}
            auto V8Result = puerts::DataTransfer::FindOrAddStruct<{{overload.return_type.variable_decl_type}}>(Isolate, Context, Ptr, false);
                {% endif %}
            {%- elif overload.return_type.is_pointer -%}{#- 指针类型，和对象类型调用同样的接口-#}
                {%- if overload.return_type.is_pointee_type_primitive -%}
                    {% if type.is_cdata %}
            auto V8Result = puerts::DataTransfer::FindOrAddCData(Isolate, Context, "{{overload.return_type.variable_decl_type}}", MethodResult, true);
                    {%- else %}
            auto V8Result = puerts::DataTransfer::FindOrAddStruct<{{overload.return_type.variable_decl_type}}>(Isolate, Context, MethodResult, true);
                    {% endif %}
                {%- else -%}
                    {% if type.is_cdata %}
            auto V8Result = puerts::DataTransfer::FindOrAddCData(Isolate, Context, "{{overload.return_type.pointee_type}}", MethodResult, true);
                    {%- else %}
            auto V8Result = puerts::DataTransfer::FindOrAddStruct<{{overload.return_type.pointee_type}}>(Isolate, Context, MethodResult, true);
                    {% endif %}
                {%- endif -%}
            {%- elif overload.return_type.v8_type == "String" -%}{#- 基础类型（含字符串、enum） -#}
                {%- if overload.return_type.variable_decl_type == "FName" or overload.return_type.variable_decl_type == "FText" -%}
            auto V8Result = v8::String::NewFromUtf8(Isolate, TCHAR_TO_UTF8(*(MethodResult.ToString())), v8::NewStringType::kNormal).ToLocalChecked();
                {%- else -%}
            auto V8Result = v8::String::NewFromUtf8(Isolate, TCHAR_TO_UTF8(*MethodResult), v8::NewStringType::kNormal).ToLocalChecked();
                {%- endif -%}
            {%- elif overload.return_type.v8_type != "" -%}
            auto V8Result = v8::{{overload.return_type.v8_type}}::New(Isolate, {%if overload.return_type.is_enum%}int32(MethodResult){%else%}MethodResult{%endif%});
            {%- endif %}
            Info.GetReturnValue().Set(V8Result);
            {%- endif %}
            
            {#- 更新out_params #}
            {{ macros.gen_update_out_params(overload.parameters, type) }}
            return;
        }
    }
    {%- endif %}
    {%- endfor %}
    puerts::DataTransfer::ThrowException(Isolate, "Invalid argument!");
}