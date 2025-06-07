// File: frontend/src/App.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import WeatherWidget from './components/WeatherWidget';
import EnergyOverview from './components/EnergyOverview';
import ExportButton from './components/ExportButton';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/overview')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Ty Berllan Energy Dashboard ⚡</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <WeatherWidget location="NP18 2" />
        {data ? <EnergyOverview data={data} /> : <p>Loading energy data...</p>}
      </div>
      <div className="mt-4">
        <ExportButton data={data} />
      </div>
    </div>
  );
}

export default App;
