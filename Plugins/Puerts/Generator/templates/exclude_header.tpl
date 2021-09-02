// gen by puerts gen tools
auto SName = Struct->GetName();
if (
{%- for type in types%}
{{"|| " if not loop.first}}SName == "{{type}}"
{%- endfor -%}
    ) {return;};