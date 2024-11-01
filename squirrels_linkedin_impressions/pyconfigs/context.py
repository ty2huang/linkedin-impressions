from typing import Any
from squirrels import ContextArgs, parameters as p


def main(ctx: dict[str, Any], sqrl: ContextArgs) -> None:

    if sqrl.param_exists("group_by"):
        group_by_param = sqrl.prms["group_by"]
        assert isinstance(group_by_param, p.SingleSelectParameter)

        ctx["dim_col"] = group_by_param.get_selected("column")
        ctx["join_with"] = group_by_param.get_selected("join_with")

    if sqrl.param_exists("job_title"):
        job_title_param = sqrl.prms["job_title"]
        assert isinstance(job_title_param, p.MultiSelectParameter)

        ctx["has_job_titles"] = job_title_param.has_non_empty_selection()
        ctx["job_titles"] = job_title_param.get_selected_ids_quoted_joined()
    
    if sqrl.param_exists("location"):
        location_param = sqrl.prms["location"]
        assert isinstance(location_param, p.MultiSelectParameter)

        ctx["has_location"] = location_param.has_non_empty_selection()
        ctx["location"] = location_param.get_selected_ids_quoted_joined()
    
    if sqrl.param_exists("start_date"):
        start_date_param = sqrl.prms["start_date"]
        assert isinstance(start_date_param, p.DateParameter)

        ctx["start_date"] = start_date_param.get_selected_date_quoted()
    