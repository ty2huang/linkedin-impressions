{%- macro cte_filtered_impressions() -%}

SELECT
    a.post_id,
    a.date,
    a.user_id,
    b.company_id,
    b.job_title,
    b.city,
    b.industry

FROM impressions AS a
    LEFT JOIN users AS b ON a.user_id = b.user_id

WHERE a.post_id = $post_id
    AND a.date >= strptime({{ ctx.start_date }}, '%Y-%m-%d')

    {%- if ctx.has_job_titles %} 
    AND job_title IN ({{ ctx.job_titles }}) 
    {%- endif %}
    
    {%- if ctx.has_location %}
    AND city IN ({{ ctx.location }}) 
    {%- endif %}

{%- endmacro -%}