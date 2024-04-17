import axios from 'axios';

const getWeather = (capital) => {
    const apiKey = import.meta.env.VITE_SOME_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;
    return axios.get(url).then(response => response.data);
};

export default { getWeather };