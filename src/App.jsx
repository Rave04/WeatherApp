import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { WeatherProvider } from "./context/WeatherContext";
import ActualWeather from "./features/ActualWeather";
import FutureWeather from "./features/FutureWeather";

const App = () => {
  return (
    <WeatherProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ActualWeather />} />
          <Route path="5days" element={<FutureWeather />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </WeatherProvider>
  );
};

export default App;
