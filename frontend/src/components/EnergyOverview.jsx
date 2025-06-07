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

