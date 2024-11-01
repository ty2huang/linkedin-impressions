from squirrels import ParametersArgs, parameters as p, parameter_options as po, data_sources as ds
from datetime import date, timedelta


def main(sqrl: ParametersArgs) -> None:
    ## Group by parameter
    group_by_options = [
        po.SelectParameterOption("company_size", "Company Size", column="num_employees", join_with="companies"),
        po.SelectParameterOption("titles", "Job Titles", column="job_title", join_with="none"),
        po.SelectParameterOption("location", "Locations", column="city", join_with="none"),
        po.SelectParameterOption("company", "Companies", column="company_name", join_with="companies"),
        po.SelectParameterOption("industry", "Industries", column="industry", join_with="none")
    ]
    p.SingleSelectParameter.CreateWithOptions("group_by", "Group By", group_by_options)

    ## Titles filter parameter
    titles_ds = ds.SelectDataSource("SELECT DISTINCT job_title FROM users", "job_title", "job_title")
    p.MultiSelectParameter.CreateFromSource("job_title", "Job Titles", titles_ds)

    ## Location filter parameter
    cities_ds = ds.SelectDataSource("SELECT DISTINCT city FROM users", "city", "city")
    p.MultiSelectParameter.CreateFromSource("location", "Locations", cities_ds)

    ## Start date parameter
    max_date = date(2024, 10, 28)
    default_start_date = max_date - timedelta(days=28)
    p.DateParameter.CreateSimple("start_date", "Start Date", default_start_date, min_date=default_start_date, max_date=max_date)
