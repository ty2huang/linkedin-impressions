import duckdb

conn = duckdb.connect(database='linkedin.duckdb')

def create_table(table_name, data):
    conn.execute(f"CREATE OR REPLACE TABLE {table_name} AS SELECT * FROM read_csv_auto('{data}')")

create_table("companies", "companies_enlarged.csv")
create_table("users", "users_enlarged.csv")
create_table("impressions", "impressions_enlarged.csv")

conn.close()
