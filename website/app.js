/* Global Variables */
// URL for weather API 
const baseURL= "https://api.openweathermap.org/data/2.5/weather?zip=";
// Key of Weather API 
const apiKey = ',&appid=3054bc3aa6fe1a7eb4c5c5fc6ab2995c&units=metric';
// The URL of our server 
const server = "http://localhost:8000";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();




// Call back function for the event listener
const collectData = () => { 
    //get value after click on the button
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    
  // getWeatherData return promise
  getWeatherData(zip).then((data) => {
    //checking the data we recieved form api
    if (data) {
      const {
        main: { temp },
        name: city,
      } = data;

      const finalData = {
        newDate,
        city,
        temp: temp, 
        feelings,
      };

      postData(server + "/add", finalData);

      updatingUI();
    }
  });

};

// Event listener to run collectData function on click
document.getElementById("generate").addEventListener("click", collectData);
// get data from weather api by zip code user entered
const getWeatherData = async (zip) => {
    try {
      const response = await fetch(baseURL + zip + apiKey);
      // convert data to json
      const data = await response.json(); 
  
      if (data.cod != 200) {
        // display the error message to user
         alert(data.message);
        throw `${data.message}`;
      }
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  
  // Function to POST data
  const postData = async (url = "", finalData = {}) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });
  
    try {
      const newData = await response.json();
      console.log(`done`, newData);
      return newData;
    } catch (error) {
      console.log(error);
    }
  };
  
  //GET Project Data and update 
  const updatingUI = async () => {
    const response = await fetch(server + "/all");
    try {
      const savedData = await response.json();
  
      document.getElementById("date").innerHTML    = savedData.newDate;
      document.getElementById("city").innerHTML    = savedData.city;
      document.getElementById("temp").innerHTML    = savedData.temp;
      document.getElementById("content").innerHTML = savedData.feelings;
    } catch (error) {
      console.log(error);
    }
  };
  