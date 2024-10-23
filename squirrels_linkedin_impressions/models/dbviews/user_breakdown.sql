WITH
filtered_impressions AS (
    
    {{ cte_filtered_impressions() | indent(4) }}

),
latest_impression_per_user AS (
    
    SELECT 
        user_id,
        MAX(date) AS date

    FROM filtered_impressions
    
    GROUP BY user_id

),
aggregated_counts_per_user AS (
    
    SELECT
        {{ ctx.dim_col }},
        COUNT(*) AS num_users
    
    FROM latest_impression_per_user AS a
        LEFT JOIN filtered_impressions AS b ON a.user_id = b.user_id AND a.date = b.date
    
    {%- if ctx.join_with == "companies" %}
        LEFT JOIN companies AS c ON b.company_id = c.company_id
    {%- endif %}

    GROUP BY {{ ctx.dim_col }}

)
SELECT
    {{ ctx.dim_col }} AS dimension,
    ROUND(num_users / (SUM(num_users) OVER ()), 3) AS percent_of_users

FROM aggregated_counts_per_user

ORDER BY num_users DESC

LIMIT 5
