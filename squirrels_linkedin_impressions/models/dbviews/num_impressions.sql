WITH
filtered_impressions AS (

    {{ cte_filtered_impressions() | indent(4) }}

),
total_impressions AS (

    SELECT COUNT(*) AS num_impressions
    
    FROM filtered_impressions

),
total_users AS (
    
    SELECT COUNT(DISTINCT user_id) AS num_users
    
    FROM filtered_impressions

)
SELECT
    num_impressions,
    num_users,

FROM total_impressions, total_users