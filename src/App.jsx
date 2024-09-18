import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import Weatherinfo from "./components/WeatherInformation/Weatherinfo";
import Weatherinfo5Days from "./components/WeatherInformation5days/Weatherinfo5days";

function App() {
  const [weather, setWeather] = useState();
  const [weather5Days, setWeather5Days] = useState();
  const [error, setError] = useState(null);

  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value.trim();
    if (!city) {
      setError("Por favor, digite o nome de uma cidade.");
      return;
    }

    const key = "4868af3a3caa3cc3a9fe424a2ebea01d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      const apiInfo = await axios.get(url);
      const apiInfo5Days = await axios.get(url5Days);

      setWeather5Days(apiInfo5Days.data);
      setWeather(apiInfo.data);
      setError(null); // Limpa qualquer erro anterior
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Cidade não encontrada. Por favor, verifique o nome da cidade.");
      } else {
        setError("Erro ao buscar dados do tempo. Tente novamente mais tarde.");
      }
      console.error("Error fetching weather data:", error);
    }
  }

  return (
    <div className="container">
      <h1>ElasClub Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder="Digite o nome da cidade" />
      <button onClick={searchCity}>Buscar</button>
      {error && <p className="error">{error}</p>}
      {weather && <Weatherinfo weather={weather} />}
      {weather5Days && <Weatherinfo5Days weather5Days={weather5Days} />}
    </div>
  );
}

export default App;