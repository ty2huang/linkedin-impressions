# LinkedIn Impressions Analytics

This project is a sample of how to use Squirrels ("squirrels_linkedin_impressions" folder) to easily create analytics APIs for your source data (such as from duckdb on MotherDuck). The frontend code ("react-linkedin-dashboard" folder) is a React app with a simple dashboard to visualize the data, and uses the Squirrels project as the backend.

## Setup

1. In "react-linkedin-dashboard", run `npm install` to install the dependencies.
2. In "squirrels_linkedin_impressions", create a virtual environment and run `pip install -r requirements.lock` to install the dependencies.
3. In the "squirrels_linkedin_impressions/assets" folder:
    - Run `python generate_impressions_data.py` to generate csv files for the LinkedIn impressions tables
    - Run `python create_duckdb_tables.py` to create the duckdb database named "linkedin.duckdb" with tables created from the csv files
