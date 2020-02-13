import React, { useState } from 'react';
import '../Styles/Weather.css';
import WeatherInfo from './WeatherInfo';


function WeatherContainer() {
    const API_KEY = 'db154385e98588d4dd08d258f60b694c';
    const [searchQuery, setSearchQuery] = useState('');
    const [weatherData, setWeatherData] = useState({
        temp: null,
        humidity: null,
        desc: null,
        city: null,
       
    });

    const [isValidZipCode, setIsValidZipCode] = useState(true);

//#region /// UPDATE SearchQuery Method
    function updateSearchQuery(event) {
        let zipCode = event.target.value;
        // let city = event.target.value;
        let isValid = validateZipCode(zipCode);
        
        setSearchQuery(zipCode);
        
        if (isValid || zipCode === '' || isValid.length === 5) {
            setIsValidZipCode(true);
        } else {
            setIsValidZipCode(false);
        }
        
    }
    //#endregion

    // ZipCode validation method 
    function validateZipCode(zipCode) {
        let regex = /[0-9]{5}/;
        return regex.test(zipCode); // return true or false based on Zip code
    }

    //#region /// GET weather Data via API
    function getWeatherData(){
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${searchQuery},us&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => 
            //  console.log(data)
            setWeatherData({
            temp: convertToFarenheit(data.main.temp),
            humidity: data.main.humidity,
            desc: data.weather[0].main,
            city: data.name,
           
        })
        );
    }
    //#endregion
// temperature conversion method
    function convertToFarenheit(temp){
        return ((temp - 273.15) * (9.0 / 5.0) + 32).toFixed(0);
    }

    // #region /// RETURN Statement
    return (
        <section className="weather-container">
            <header className="weather-header">
                <h3>Weather-Inforation</h3>
                <div>
                    <input
                        placeholder="zipcode" 
                        className="search-input"
                        onChange={updateSearchQuery}
                        maxLength= '5'
                    />
                    <button onClick={getWeatherData}
                    className="material-icons">search</button>
                </div> 
            </header> 
            <p className="error">{isValidZipCode ? '' : 'Invalid Zip Code'}</p>
            <section className="weather-info">
                {weatherData.temp === null ? (
                    <p>No Weather to Display<i class="material-icons">wb_sunny</i></p>
                ) : <WeatherInfo data = {weatherData} />
            }
                      
            </section>
            <p className="copyRight">@copyright 2020</p>
        </section>
         
    )
    //#endregion
}
export default WeatherContainer;
