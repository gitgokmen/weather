const API_KEY = "WRITE UR OWN API KEY HERE CUZ I DONT WANT TO LEAK MINE";
      const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

      const cities = [
        "Tokyo",
        "New York",
        "London",
        "Paris",
        "Sydney",
        "Berlin",
        "Moscow",
        "Dubai",
        "Singapore",
        "Mersin",
        "Sivas",
        "Muğla",
        "Kayseri",
        "Hafik",
        "İzmir",
        "Ankara",
        "Antalya",
        "Palo Alto",
        "Cupertino",
        "Bremen",
        "Cairo",
        "Rio de Janeiro",
        "Los Angeles",
        "Bangkok",
        "Istanbul",
        "Seoul",
        "Mexico City",
        "Buenos Aires",
        "Lagos",
        "Jakarta",
        "Madrid",
        "Rome",
        "Amsterdam",
        "Vienna",
        "Prague",
        "Warsaw",
        "Stockholm",
        "Oslo",
        "Helsinki",
        "Copenhagen",
      ];

      function getRandomCities() {
        const shuffled = cities.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 9);
      }

      async function getWeatherForCity(city) {
        try {
          const response = await fetch(
            `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return {
            city: data.name,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          };
        } catch (error) {
          console.error(`Error fetching weather for ${city}:`, error);
          return {
            city: city,
            temperature: "--",
            description: "Data unavailable",
            icon: "01d",
          };
        }
      }

      async function fetchWeatherData() {
        const cards = document.querySelectorAll(".card");
        const randomCities = getRandomCities();

        cards.forEach((card, index) => {
          card.innerHTML = "Be patient bro...";
        });

        try {
          const weatherPromises = randomCities.map((city) =>
            getWeatherForCity(city)
          );
          const weatherData = await Promise.all(weatherPromises);

          weatherData.forEach((data, index) => {
            if (index < cards.length) {
              cards[index].innerHTML = `
                <div style="font-weight: bold; margin-bottom: 10px;">${data.city}</div>
                <div style="font-size: 2em; margin: 10px 0;">${data.temperature}°C</div>
                <div style="text-transform: capitalize; font-size: 1.2em;">${data.description}</div>
              `;
            }
          });
        } catch (error) {
          console.error("Error fetching weather data:", error);
          cards.forEach((card) => {
            card.innerHTML = "Error loading data";
          });
        }
      }