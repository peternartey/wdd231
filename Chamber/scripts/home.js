const apiKey = '753c05171ea53648ce7c098157f9ff67';
const city = 'Lima';
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
const lastModified = document.lastModified;

// Show last updated time
document.getElementById("last-updated").textContent = `Last modified: ${lastModified}`;

// Run after page loads
document.addEventListener("DOMContentLoaded", () => {
  loadMembers();
});

let membersData = [];

// Load members from JSON
async function loadMembers() {
  try {
    const response = await fetch("data/members.json"); // ✅ Fixed typo here
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const members = await response.json();
    membersData = members;
    displayGoldMembers(members);
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

// Fetch and display current weather
async function getCurrentWeather() {
  try {
    const response = await fetch(weatherURL);

    if (!response.ok) {
      throw new Error('Failed to fetch current weather data');
    }

    const data = await response.json();

    document.querySelector('#current-temp').textContent = `${data.main.temp} °C`;
    document.querySelector('#current-desc').textContent = data.weather[0].description;
    document.querySelector('#high').textContent = `${data.main.temp_max} °C`;
    document.querySelector('#low').textContent = `${data.main.temp_min} °C`;
    document.querySelector('#humidity').textContent = `${data.main.humidity} %`;
    document.querySelector('#sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-GH', {
      hour: '2-digit',
      minute: '2-digit'
    });
    document.querySelector('#sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-GH', {
      hour: '2-digit',
      minute: '2-digit'
    });

  } catch (error) {
    console.error('Error fetching current weather:', error);
  }
}

// Fetch and display 3-day forecast
async function getForecast() {
  try {
    const response = await fetch(forecastURL);

    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }

    const data = await response.json();
    const forecastContainer = document.querySelector('#forecast');
    forecastContainer.innerHTML = ''; // ✅ Clear previous forecast

    const days = [];

    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!days.includes(date)) {
        days.push(date);
      }
    });

    const filteredForecast = days.slice(0, 3).map(day => {
      let forecast = data.list.find(item => item.dt_txt === `${day} 12:00:00`);
      if (!forecast) {
        forecast = data.list.find(item => item.dt_txt.startsWith(day));
      }
      return forecast;
    }).filter(item => item);

    filteredForecast.forEach((item, index) => {
      const date = new Date(item.dt_txt);
      const temp = Math.round(item.main.temp);
      const description = item.weather[0].description;
      const icon = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;

      let dayLabel;
      if (index === 0) {
        dayLabel = 'Today';
      } else if (index === 1) {
        dayLabel = 'Tomorrow';
      } else {
        dayLabel = date.toLocaleDateString('en-US', { weekday: 'long' });
      }

      const forecastCard = document.createElement('div');
      forecastCard.classList.add('forecast-day');

      forecastCard.innerHTML = `
        <p>${dayLabel}</p>
        <img src="${icon}" alt="${description}">
        <p>${temp} °C - ${description}</p>
      `;

      forecastContainer.appendChild(forecastCard);
    });

  } catch (error) {
    console.error('Error fetching forecast:', error);
  }
}

// Display gold members in the advertisement section
function displayGoldMembers(members = membersData) {
  const goldMembers = members.filter(member => member.membership === 'Gold');
  console.log('Gold Members:', goldMembers);

  const displayContainer = document.getElementById("advertisement");
  displayContainer.innerHTML = ''; // ✅ Clear previous ads

  goldMembers.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("advertisement-card");

    card.innerHTML = `
      <div class="company-name">${member.name}</div>
      <div class="company-content">
        <div class="company-img">
          <img src="${member.image}" alt="${member.name}">
        </div>
        <div class="company-info">
          <p><span>Email:</span> ${member.email}</p>
          <p><span>Phone:</span> ${member.phone}</p>
          <p><span>Website:</span> <a href="${member.website}" target="_blank">${member.website}</a></p>
        </div>
      </div>
    `;

    displayContainer.appendChild(card);
  });
}

// Call weather functions
getCurrentWeather();
getForecast();
