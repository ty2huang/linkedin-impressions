import { useEffect, useMemo, useState } from "react";
import { DateParameterType, MultiSelectParameterType, ParameterType, SingleSelectParameterType } from "../types/ParametersResponse";
import { MultiSelect } from "react-multi-select-component";
import './ParameterWidgets.css';

interface WidgetProps {
	obj: ParameterType | null;
	handleChange: (x: string[]) => void;
}

function createOption(id: string, label: string) {
	return (<option key={id} value={id}>{label}</option>);
}

function widgetWithLabel(data: ParameterType, coreWidget: JSX.Element) {
	return (
		<div>
			<div className="widget-label">
				<u>{data.label}</u>
			</div>
			{coreWidget}
		</div>
	);
}

export function SingleSelectWidget({ obj, handleChange }: WidgetProps) {
	if (!obj) {
		return <></>;
	}

	const data = obj as SingleSelectParameterType;
	const options = data.options.map(option => {
		return createOption(option.id, option.label);
	});

	const [selectedId, setSelectedId] = useState<string>("");
	useMemo(() => {
		setSelectedId(data.selected_id);
	}, [data])

	useEffect(() => {
		return handleChange([selectedId]);
	}, [selectedId])

	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedId(e.target.value);
	};

	return widgetWithLabel(data,
		<select
			className="single-select padded widget"
			value={selectedId}
			onChange={onChange}
		>
			{options}
		</select>
	);
}

export function MultiSelectWidget({ obj, handleChange }: WidgetProps) {
	if (!obj) {
		return <></>;
	}
	
	const data = obj as MultiSelectParameterType;

	type InputOption = {label: string, id: string};
	type Option = {label: string, value: string};
	const convertInputOption = (x: InputOption) => {return {label: x.label, value: x.id}};
	const getOptions = () => data.options.map(option => convertInputOption(option));
	const getSelectedValues = (options: Option[]) => {
		return options.length > 0 ? options.map(x => x.value) : [""];
	}

	const [selected, setSelected] = useState<Option[]>([]);
	useMemo(() => {
		const newSelected = data.selected_ids.map(selectedId => {
			const selectedObj = data.options.find(option => (option.id == selectedId));
			return convertInputOption(selectedObj || {label: "", id: ""});
		});
		setSelected(newSelected);
	}, [data]);

	useEffect(() => {
		return handleChange(getSelectedValues(selected));
	}, [selected]);
	
	const onChange = (x: Option[]) => {
		setSelected(x);
	};

	return widgetWithLabel(data,
		<MultiSelect
			options={getOptions()}
			labelledBy={data.name}
			className="multi-select widget"
			value={selected}
			onChange={onChange}
			hasSelectAll={data.show_select_all}
		/>
	);
}


export function DateWidget({ obj, handleChange }: WidgetProps) {
	if (!obj) {
		return <></>;
	}
	
	const data = obj as DateParameterType;

	const [selectedDate, setSelectedDate] = useState("");
	useMemo(() => {
		setSelectedDate(data.selected_date);
	}, [data]);

	useEffect(() => {
		return handleChange([selectedDate]);
	}, [selectedDate]);

	return widgetWithLabel(data,
		<input type="date"
			min={data.min_date} max={data.max_date}
			className="date padded widget"
			value={selectedDate} 
			onChange={e => setSelectedDate(e.target.value)} 
		/>
	);
}
