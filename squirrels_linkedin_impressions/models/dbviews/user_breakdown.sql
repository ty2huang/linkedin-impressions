WITH
latest_impression_per_user AS (
    
    {{ cte_latest_impression_per_user() | indent(4) }}

),
aggregated_counts_per_user AS (
    
    SELECT
        {{ ctx.dim_col }},
        COUNT(*) AS num_users
    
    FROM latest_impression_per_user AS a
    
    {%- if ctx.join_with == "companies" %}
        LEFT JOIN companies AS c ON a.company_id = c.company_id
    {%- endif %}

    GROUP BY {{ ctx.dim_col }}

)
SELECT
    {{ ctx.dim_col }} AS dimension,
    ROUND(num_users / (SUM(num_users) OVER ()), 3) AS percent_of_users

FROM aggregated_counts_per_user

ORDER BY num_users DESC

LIMIT 5
