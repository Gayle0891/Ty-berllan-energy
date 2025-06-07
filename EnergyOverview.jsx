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

// File: frontend/src/components/WeatherWidget.jsx
import React, { useEffect, useState } from 'react';

function WeatherWidget({ location }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(`/api/weather?location=${encodeURIComponent(location)}`)
      .then(res => res.json())
      .then(setWeather)
      .catch(console.error);
  }, [location]);

  if (!weather) return <div>Loading weather...</div>;

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">Weather ({location})</h2>
      <p>🌤️ {weather.description}</p>
      <p>🌡️ {weather.temp}°C</p>
      <p>💨 Wind: {weather.wind_speed} m/s</p>
    </div>
  );
}

export default WeatherWidget;

// File: frontend/src/components/EnergyOverview.jsx
import React from 'react';

function EnergyOverview({ data }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Energy Overview</h2>
      <ul className="space-y-1">
        <li>🔋 Battery Charge: {data.battery_percentage}%</li>
        <li>🌞 Solar Generation: {data.solar_generation} kWh</li>
        <li>⚡ Grid Import: {data.grid_import} kWh</li>
        <li>🏠 Home Consumption: {data.home_consumption} kWh</li>
        <li>🔥 Eddi Status: {data.eddi_heating ? 'Heating' : 'Idle'}</li>
      </ul>
    </div>
  );
}

export default EnergyOverview;
