import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import Weatherinfo from "./components/WeatherInformation/Weatherinfo";

function App() {
  const [weather, setWeather] = useState();
  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value;
    const key = "4868af3a3caa3cc3a9fe424a2ebea01d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    const apiInfo = await axios.get(url);
    setWeather(apiInfo.data);
  }

  return (
    <div>
      <h1>ElasClub Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder="Digite o nome da cidade" />
      <button onClick={searchCity}>Buscar</button>
      {weather && <Weatherinfo weather={weather} />}
    </div>
  );
}

export default App;
