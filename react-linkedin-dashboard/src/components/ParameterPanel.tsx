import { useEffect, useRef, useState } from "react";
import { DateParameterType, MultiSelectParameterType, ParametersResponse, SingleSelectParameterType } from "../types/ParametersResponse";
import { DateWidget, MultiSelectWidget, SingleSelectWidget } from "./ParameterWidgets";
import './ParameterPanel.css';

interface ParameterPanelProps {
  host: string;
  executionTime: number;
  updateTableData: (x: Map<string, string[]>) => void;
}

async function fetchParameters(host: string, setParametersData: (x: ParametersResponse) => void) {
  const response = await fetch(host+"/linkedin-impressions/v1/dataset/user-breakdown/parameters");
  const data = await response.json();
  setParametersData(data as ParametersResponse);
}

export function ParameterPanel({ host, executionTime, updateTableData }: ParameterPanelProps) {
  const paramSelections = useRef(new Map<string, string[]>());
  
  const [parametersData, setParametersData] = useState<ParametersResponse | null>(null);
  const [groupByParam, setGroupByParam] = useState<SingleSelectParameterType | null>(null);
  const [jobTitleParam, setJobTitleParam] = useState<MultiSelectParameterType | null>(null);
  const [locationParam, setLocationParam] = useState<MultiSelectParameterType | null>(null);
  const [startDateParam, setStartDateParam] = useState<DateParameterType | null>(null);
  const [isApiLoading, setIsApiLoading] = useState(false);

  function handleChange(name: string | undefined, value: string[]) {
    if (name) {
      paramSelections.current.set(name, value);
    }
  }

  useEffect(() => {
    fetchParameters(host, setParametersData);
  }, []);

  useEffect(() => {
    if (parametersData) {
      for (const param of parametersData.parameters) {
        if (param.name == "group_by") {
          setGroupByParam(param as SingleSelectParameterType);
        }
        if (param.name == "job_title") {
          setJobTitleParam(param as MultiSelectParameterType);
        }
        if (param.name == "location") {
          setLocationParam(param as MultiSelectParameterType);
        }
        if (param.name == "start_date") {
          setStartDateParam(param as DateParameterType);
        }
      }
    }
  }, [parametersData]);

  const handleApply = async () => {
    setIsApiLoading(true);
    await updateTableData(paramSelections.current);
    setIsApiLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '20px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '10px',
        maxWidth: '100%'
      }}>
        <SingleSelectWidget obj={groupByParam} handleChange={(x) => handleChange(groupByParam?.name, x)} />
        <MultiSelectWidget obj={jobTitleParam} handleChange={(x) => handleChange(jobTitleParam?.name, x)} />
        <MultiSelectWidget obj={locationParam} handleChange={(x) => handleChange(locationParam?.name, x)} />
        <DateWidget obj={startDateParam} handleChange={(x) => handleChange(startDateParam?.name, x)} />
      </div>
      <input type="submit" value="Apply" className="blue-button widget" 
        style={{ margin: '20px' }}
        onClick={handleApply}  
      />
      {isApiLoading ? 
        <div>Execution in progress...</div> :
        <div>API execution time: {executionTime.toFixed(0)} ms</div>
      }
    </div>
  );
}