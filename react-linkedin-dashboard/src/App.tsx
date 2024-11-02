import 'chart.js/auto';
import { ParameterPanel } from './components/ParameterPanel';
import { useEffect, useState } from 'react';
import { TableDataType } from './types/DatasetResponse';
import { BarChart } from './components/BarChart';
import LoadingSpinner from './components/LoadingSpinner';

const hostname = import.meta.env.DEV ? "localhost" : "54.227.105.184";
const host = `http://${hostname}:4465/squirrels-v0`;

function App() {
  
  const [tableData, setTableData] = useState<TableDataType | null>(null);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateTableData = async (paramSelections: Map<string, string[]>) => {
    setExecutionTime(0);
    const startTime = performance.now();
    setIsLoading(true);

    const queryParams = new URLSearchParams();
    for (const [param, selections] of paramSelections) {
        for (const selection of selections) {
            queryParams.append(param, selection);
        }
    }

    const url =  `${host}/linkedin-impressions/v1/dataset/user-breakdown?${queryParams.toString()}`;
    const response = await fetch(url);
    const data = await response.json();
    setTableData(data as TableDataType);

    setIsLoading(false);
    const endTime = performance.now();
    setExecutionTime(endTime - startTime);
  };

  useEffect(() => {
    updateTableData(new Map());
  }, []);

  return (
    <>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ marginBottom: '0px', textAlign: 'center' }}>LinkedIn Post Viewers Demographics (Duckdb)</h2>
        <p>(~5 hours of data engineering time)</p>
        <ParameterPanel host={host} executionTime={executionTime} updateTableData={updateTableData} />
        <BarChart tableData={tableData} />
      </div>
      <LoadingSpinner isLoading={isLoading} />
    </>
  );
}

export default App;
