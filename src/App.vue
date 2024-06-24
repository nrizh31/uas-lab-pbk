<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-black text-white" :style="{ height: '100px' }">
      <q-toolbar>
        <div class="q-gutter-sm" style="margin-left:auto; margin-top: 20px; position: relative;">
          <q-btn
            dense
            color="white"
            label="List Tugas"
            rounded
            push
            style="background-color: transparent; border: 1px solid white;"
            @click="toggleTasks"
          ></q-btn>
          <div class="task-list" v-if="tasksVisible">
            <h3>List Tugas:</h3>
            <ul>
              <li v-for="task in tasks" :key="task.id">
                <a :href="task.link" target="_blank">{{ task.title }}</a>
              </li>
            </ul>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div id="app" :class="typeof weather.main !== 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
        <main>
          <h2 class="search-title">Masukkan Kota Anda</h2>
          <div class="search-box">
            <input
              type="text"
              class="search-bar"
              placeholder="Search..."
              v-model="query"
              @keyup.enter="fetchWeather"
            />
          </div>

          <div class="weather-wrap" v-if="typeof weather.main !== 'undefined'">
            <div class="location-box">
              <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
              <div class="date">{{ dateBuilder() }}</div>
            </div>

            <div class="weather-box">
              <div class="temp">{{ Math.round(weather.main.temp) }}°c</div>
              <div class="weather">{{ weather.weather[0].main }}</div>
            </div>
          </div>
        </main>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { QLayout, QHeader, QToolbar, QPageContainer, QBtn } from 'quasar';

export default {
  name: 'App',
  components: {
    QLayout,
    QHeader,
    QToolbar,
    QPageContainer,
    QBtn,
  },
  data() {
    return {
      api_key: 'fa3783b98da38f7f605a54f0ea58d1d1',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {},
      tasks: [
        { id: 1, title: 'Tugas 1', link: 'https://naufalrizh1.netlify.app' },
        { id: 2, title: 'Tugas 2', link: 'https://naufalrizh-tugas2-pbk.netlify.app' },
        { id: 3, title: 'Tugas 3', link: 'https://naufalrizh-tugas3-pbk.netlify.app' },
        { id: 4, title: 'Tugas 4', link: 'https://naufalrizh-tugas4-pbk.netlify.app' },
        { id: 5, title: 'Tugas 5', link: 'https://naufalrizh-tugas5.netlify.app' },
        { id: 6, title: 'Tugas 6', link: 'https://naufalrizh-tugas6.netlify.app' },
        { id: 7, title: 'Tugas 7', link: 'https://naufalrizh-tugas7-pbk.netlify.app' },
      ],
      tasksVisible: false, // Initial visibility state for tasks
    };
  },
  methods: {
    fetchWeather() {
      if (this.query) {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then((res) => res.json())
          .then((results) => {
            if (results.cod === 200) {
              this.setResults(results);
            } else {
              this.weather = {}; // Clear the weather data if an error occurs
            }
          })
          .catch((error) => {
            console.error('Error fetching weather data:', error);
            this.weather = {}; // Clear the weather data if an error occurs
          });
      }
    },
    setResults(results) {
      this.weather = results;
    },
    dateBuilder() {
      let d = new Date();
      let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
    toggleTasks() {
      this.tasksVisible = !this.tasksVisible; // Toggle tasks visibility when button is clicked
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'montserrat', sans-serif;
  overflow: hidden; /* Prevent scrolling */
}

#app {
  background-image: url('./assets/pexels-david-besh-969260.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  transition: 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Prevent scrolling */
}

main {
  width: 100%;
  max-width: 500px;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.9); /* More solid black background */
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.search-title {
  color: #FFF;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.location-box .location {
  color: #FFF;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #FFF;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: #FFF;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.task-list {
  position: absolute;
  top: 60px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.task-list h3 {
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: white;
}

.task-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  font-size: 16px;
  margin-bottom: 5px;
}

.task-list li a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.task-list li a:hover {
  color: #f39c12;
}

/* Override q-btn style for white text and background */
.q-btn {
  color: white !important;
  background-color: transparent !important;
  border: 1px solid white !important;
  border-radius: 20px !important;
  padding: 10px 20px !important;
  font-size: 16px !important;
  transition: background-color 0.3s, color 0.3s;
}

.q-btn:hover {
  background-color: white !important;
  color: black !important;
}
</style>
