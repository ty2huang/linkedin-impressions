WITH
latest_impression_per_user AS (

    {{ cte_latest_impression_per_user() | indent(4) }}

),
total_impressions AS (

    SELECT COUNT(*) AS num_impressions
    
    FROM latest_impression_per_user

),
total_users AS (
    
    SELECT COUNT(DISTINCT user_id) AS num_users
    
    FROM latest_impression_per_user

)
SELECT
    num_impressions,
    num_users

FROM total_impressions, total_users