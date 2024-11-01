import 'chart.js/auto';
import { ParameterPanel } from './components/ParameterPanel';
import { useEffect, useState } from 'react';
import { TableDataType } from './types/DatasetResponse';
import { BarChart } from './components/BarChart';

const hostname = import.meta.env.DEV ? "localhost" : "54.227.105.184";
const host = `http://${hostname}:4465/squirrels-v0`;

function App() {
  
  const [tableData, setTableData] = useState<TableDataType | null>(null);
  const [executionTime, setExecutionTime] = useState<number>(0);

  const updateTableData = async (paramSelections: Map<string, string[]>) => {
    const queryParams = new URLSearchParams();
    for (const [param, selections] of paramSelections) {
        for (const selection of selections) {
            queryParams.append(param, selection);
        }
    }

    const startTime = performance.now();

    const url =  `${host}/linkedin-impressions/v1/dataset/user-breakdown?${queryParams.toString()}`;
    const response = await fetch(url);
    const data = await response.json();
    setTableData(data as TableDataType);

    const endTime = performance.now();
    setExecutionTime(endTime - startTime);
  };

  useEffect(() => {
    updateTableData(new Map());
  }, []);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '0px' }}>LinkedIn Post Viewers Demographics - Using QPlex</h2>
      <p>(With ~5 hours of data engineering time)</p>
      <ParameterPanel host={host} executionTime={executionTime} updateTableData={updateTableData} />
      <BarChart tableData={tableData} />
    </div>
  );
}

export default App;
