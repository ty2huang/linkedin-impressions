{%- macro cte_latest_impression_per_user() -%}

WITH
latest_impression_by_user AS (

    SELECT
        a.post_id,
        a.user_id,
        MAX(a.date) AS date,

    FROM impressions AS a

    WHERE a.post_id = $post_id
        AND a.date >= strptime({{ ctx.start_date }}, '%Y-%m-%d')

    GROUP BY a.post_id, a.user_id
    
)
SELECT
    a.post_id,
    a.date,
    a.user_id,
    b.company_id,
    b.job_title,
    b.city,
    b.industry

FROM latest_impression_by_user AS a
    LEFT JOIN users AS b ON a.user_id = b.user_id

WHERE true

    {%- if ctx.has_job_titles %} 
    AND job_title IN ({{ ctx.job_titles }}) 
    {%- endif %}
    
    {%- if ctx.has_location %}
    AND city IN ({{ ctx.location }}) 
    {%- endif %}

{%- endmacro -%}