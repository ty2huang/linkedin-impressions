# LinkedIn Impressions Analytics

This project is a sample of how to use Squirrels ("squirrels_linkedin_impressions" folder) to easily create analytics APIs for your source data (such as from duckdb on MotherDuck). The frontend code ("react-linkedin-dashboard" folder) is a React app with a simple dashboard to visualize the data, and uses the Squirrels project as the backend.

## Setup

1. Create an account on MotherDuck for free: https://motherduck.com/
2. Run the following in a notebook:
    - ATTACH 'md:_share/squirrels_analytics_public_db/597bd9c2-72c8-49b9-8ed6-f3d4441fda24'
3. Go to Settings > General and create an access token (will be used in step 5)
4. In this project, copy the "squirrels_linkedin_impressions/env_example.yml" file as "squirrels_linkedin_impressions/env.yml" (note that this filename is git ignored)
5. Save the access token in "env.yml" in the "credentials > motherduck_token > password" field

Going forward (or until your access token expires), your backend code will be able to access the LinkedIn impressions tables on motherduck!
