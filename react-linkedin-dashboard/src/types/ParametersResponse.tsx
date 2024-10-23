interface ParameterTypeBase {
    widget_type: string;
    name: string;
    label: string;
    description: string;
}

interface SelectParameterType extends ParameterTypeBase {
    options: {
        id: string;
        label: string;
    }[];
    trigger_refresh: boolean;
}

export interface SingleSelectParameterType extends SelectParameterType {
    selected_id: string;
}

export interface MultiSelectParameterType extends SelectParameterType {
    show_select_all: boolean;
    is_dropdown: boolean;
    order_matters: boolean;
    selected_ids: string[];
}

interface DateParameterTypeBase extends ParameterTypeBase {
    min_date: string;
    max_date: string;
}

export interface DateParameterType extends DateParameterTypeBase {
    selected_date: string;
}

export type ParameterType = 
      SingleSelectParameterType 
    | MultiSelectParameterType 
    | DateParameterType 

export interface ParametersResponse {
    parameters: ParameterType[];
}
