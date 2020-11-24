const app = () => {
  const API_URL = "http://api.openweathermap.org/data/2.5/weather";
  let UNITS = "metric";
  const API_KEY = "e94a79445bfccbfa335b8e0d20614b9f";

  const searchButton = document.querySelector(".search-button");
  const clear = document.querySelector(".clear");
  const input = document.querySelector(".search-bar");
  const metricButton = document.querySelector(".metric");
  const imperialButton = document.querySelector(".imperial");

  clear.addEventListener("click", () => {
    document.querySelector(".search-bar").value = "";
  });

  metricButton.addEventListener("click", () => {
    UNITS = "metric";
    document.querySelector(".unit").textContent = "\u2103";
    document.querySelector(".perc-unit").textContent = "\u2103";
    document.querySelector(".search-button").click();
  });

  imperialButton.addEventListener("click", () => {
    UNITS = "imperial";
    document.querySelector(".unit").textContent = "\u2109";
    document.querySelector(".perc-unit").textContent = "\u2109";
    document.querySelector(".search-button").click();
  });

  searchButton.addEventListener("click", () => {
    let CITY = document.querySelector(".search-bar").value;
    CITY = CITY.toLowerCase();
    let URL = `${API_URL}?q=${CITY}&units=${UNITS}&appid=${API_KEY}`;

    const getData = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      const { main, temp } = data;

      const { name } = data;

      document.getElementById("location").textContent = name;
      document.getElementById("temp").textContent = main.temp;
      document.getElementById("perc-temp").textContent = main.feels_like;

      const { weather, icon } = data;

      document.querySelector(
        ".icon"
      ).src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

      document.getElementById("press").textContent = main.pressure;
      document.getElementById("humid").textContent = main.humidity;
    };

    getData().catch((error) => {
      console.error();
      document.getElementById("temp").textContent = "???";
      document.getElementById("perc-temp").textContent = "???";
      document.getElementById("location").textContent =
        "Please enter valid location";
      document.querySelector(".icon").src = "./Assets/dog.png";
      document.getElementById("press").textContent = "???";
      document.getElementById("humid").textContent = "???";
    });
  });

  input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.querySelector(".search-button").click();
    }
  });
};

app();
