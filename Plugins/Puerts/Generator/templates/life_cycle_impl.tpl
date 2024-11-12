{%- import "auxiliary_macro.tpl" as macros -%}

static void* _{{type.spelling}}New_(const v8::FunctionCallbackInfo<v8::Value>& Info)
{
    {{ macros.gen_scope() }}

    {%- if (type.constructors | length) > 0 %}
    {%- for ctor in type.constructors %}
    {%- if not ctor.is_blocked %}
    if (Info.Length() == {{ctor.parameters | length}})
    {
        if ({%- if ctor.parameters | length == 0 -%}
                true
            {%- else -%}
            {{ macros.gen_conditional(ctor.parameters, type) }}
            {%- endif %})
        {
            {{ macros.gen_arguments(ctor.parameters) }}
            {{type.spelling}}* Obj = new {{type.spelling}}({{ macros.gen_arguments_passing(ctor.parameters) }});
            {{ macros.gen_update_out_params(ctor.parameters) }}
            
            // UE_LOG(LogTemp, Warning, TEXT("_{{type.spelling}}New_:%p"), Obj);
            return Obj;
        }
    }
    {%- endif %}
    {%- endfor %}
    puerts::DataTransfer::ThrowException(Isolate, "Invalid argument!");
    return nullptr;
    {%- else %}
    // default ctor
    {{type.spelling}}* Obj = new {{type.spelling}}();

    // UE_LOG(LogTemp, Warning, TEXT("_{{type.spelling}}New_:%p"), Obj);
    return Obj;
    {%- endif %}
}

static void _{{type.spelling}}Delete_(void *Ptr)
{
    {{type.spelling}} *Self = static_cast<{{type.spelling}}*>(Ptr);
    // UE_LOG(LogTemp, Warning, TEXT("_{{type.spelling}}Delete_:%p"), Self);
    delete Self;
}
