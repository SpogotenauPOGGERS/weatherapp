import { useState, useEffect } from "react";

function App() {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [forecastOneDay, setForecastOneDay] = useState();
  const [forecastTwoDay, setForecastTwoDay] = useState();
  const [forecastThreeDay, setForecastThreeDay] = useState();
  const [inputCity, setInputCity] = useState("Zürich");

  function startFetch() {
    setInputCity(document.querySelector('input[name="cityInput"]').value);
  }

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=b9566b8a56c84e2881c210550231604&q=${inputCity}&days=4&aqi=no&alerts=no`
        )
      ).json();
      if (data.error) {
        const weatherResponse = document.querySelector(".weatherResponse");
        weatherResponse.textContent = "There's no place like this";
        const weather = document.querySelector(".weather");
        weather.textContent = "";
        const city = document.querySelector(".city");
        city.textContent = "";
        const country = document.querySelector(".country");
        country.textContent = "";
        console.log("found nothing");
      } else {
        const weatherResponse = document.querySelector(".weatherResponse");
        weatherResponse.textContent = "";
        setCity(data.location.name);
        setCountry(data.location.country);
        setWeather(data.current.temp_c);
        setForecastOneDay(data.forecast.forecastday[1].day.maxtemp_c);
        setForecastTwoDay(data.forecast.forecastday[2].day.maxtemp_c);
        setForecastThreeDay(data.forecast.forecastday[3].day.maxtemp_c);

        document.querySelector(".tomorrow").style.marginTop = "26rem";
        document.querySelector(".days").style.marginTop = "26rem";
        document.querySelector(".Days").style.marginTop = "26rem";

        document.querySelector(".tomorrow").style.display = "block";
        document.querySelector(".days").style.display = "block";
        document.querySelector(".Days").style.display = "block";

        setTimeout(() => {
          document.querySelector(".tomorrow").style.marginTop = "0px";
        }, "50");
        setTimeout(() => {
          document.querySelector(".days").style.marginTop = "0px";
        }, "200");
        setTimeout(() => {
          document.querySelector(".Days").style.marginTop = "0px";
        }, "350");
      }
    };
    dataFetch();
    return () => {
      document.querySelector(".tomorrow").style.display = "none";
      document.querySelector(".days").style.display = "none";
      document.querySelector(".Days").style.display = "none";
    };
  }, [inputCity]);

  return (
    <>
      <div className="h-screen max-h-screen bg-gradient-to-br from-yellow-300 via-cyan-400  to-sky-800">
        <h1 className="pl-8 text-3xl py-8">Weather Guru</h1>
        <div className="text-center">
          <input
            className="p-2 text-xl rounded-l-lg"
            type="text"
            placeholder="Your city"
            name="cityInput"
          />
          <button
            className="bg-blue-500 py-2 px-4 text-xl rounded-r-lg hover:bg-blue-600"
            onClick={startFetch}
          >
            Search
          </button>
        </div>

        <div className="response">
          <p className="weatherResponse text-center mt-10 text-4xl"></p>
          <h1 className="city text-center text-4xl mt-10">{city}</h1>
          <h2 className="country text-center">{country}</h2>
          <p className="weather py-8 text-center text-8xl">{`${Math.round(
            weather
          )}°`}</p>
          <div className="flex flex-col justify-center items-center gap-y-10 sm:flex-row sm:gap-x-20 sm:mt-12">
            <div className="tomorrow text-center text-sky-900 bg-blue-500 border-solid border-2  border-blue-800 rounded-xl pt-3 pb-6 w-32 h-24 relative mt-80 transition-all duration-700 ease-in-out">
              <p className="mb-2 text-xl">Tomorrow</p>
              <p className="text-sky-300">{`${Math.round(forecastOneDay)}°`}</p>
            </div>
            <div className="days text-center text-sky-900 bg-blue-500 border-solid border-2  border-blue-800 rounded-xl pt-3 pb-6 w-32 h-24 relative mt-80 transition-all duration-700 ease-in-out">
              <p className="mb-2 text-xl">In 2 days</p>
              <p className="text-sky-300">{`${Math.round(forecastTwoDay)}°`}</p>
            </div>
            <div className="Days text-center text-sky-900 bg-blue-500 border-solid border-2  border-blue-800 rounded-xl pt-3 pb-6 w-32 h-24 relative mt-80 transition-all duration-700 ease-in-out">
              <p className="mb-2 text-xl">In 3 Days</p>
              <p className="text-sky-300">{`${Math.round(
                forecastThreeDay
              )}°`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
