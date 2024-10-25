import 'chart.js/auto';
import { ParameterPanel } from './components/ParameterPanel';
import { useEffect, useState } from 'react';
import { TableDataType } from './types/DatasetResponse';
import { BarChart } from './components/BarChart';

const hostname = import.meta.env.DEV ? "localhost" : "54.227.105.184";
const host = `http://${hostname}:4465/squirrels-v0`;

function App() {
  
  const [tableData, setTableData] = useState<TableDataType | null>(null);

  const updateTableData = async (paramSelections: Map<string, string[]>) => {
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
  };

  useEffect(() => {
    updateTableData(new Map());
  }, []);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ margin: '10px' }}>LinkedIn Post Viewers Demographics</h2>
      <ParameterPanel host={host} updateTableData={updateTableData} />
      <BarChart tableData={tableData} />
    </div>
  );
}

export default App;
