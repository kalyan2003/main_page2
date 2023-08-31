const clientId = 'OZATO4USDMG5ZYJMKY54YTK4Y2TPDWK34PSUG3GIV0RULAXP';
const clientSecret = 'OSXQJ50AFX20J2HNOHKFGPWKVVNYNSP13IOGOB5YETXLPLR4';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '7d20a5895a38a13dcdbb647529a3d4ca';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
//5 day forecast
const openWeatherKey1 = '8c8a69668bf6a4341f61a3bf5e833bbd';
const weatherUrl1 = 'https://api.openweathermap.org/data/2.5/forecast';
//background
const weatherUrl2='http://api.openweathermap.org/data/2.5/air_pollution/forecast'
// Page Elements
const $input = $('#city'); 
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $container0 = $('.container0');
const $container1 = $('.container1');
const $container2 = $('.container2');
const $venueDivs = [ $('#venue1'), $('#venue2'), $('#venue3'), $('#venue4'),$('#venue5'),$('#venue6'),$('#venue7'),$('#venue8')];
const $weatherDiv = $('#weather1');
const $weatherDiv1= $('#weather2');
const $weatherDiv2= $('#weather3');
const $weatherDiv3= $('#weather4');
const $weatherDiv4= $('#weather5');
const $weatherDiv5= $('#weather6');
const $weatherDiv12= $('#weather25');
const $myElement2=$("#myElement");
const $myElement3=$("#myElement1");
const $new=$('#w1');
const $new1=$('#a1');
const $new2=$('#p1');
const $back1=$('#back');
const $click1=$('#click2');
const $click11=$('#click11');
const weekDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

// Function to fetch weather data from OpenWeatherMap API
   async function fetchWeatherData(city) {
      
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${$input.val()}&appid=${openWeatherKey1}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          // Extract longitude and latitude from the weather data
          const longitude = data.coord.lon;
          const latitude = data.coord.lat;

          // Fetch pollution data using the latitude and longitude
          const pollutionData = await fetchPollutionData(latitude,longitude);

       return { longitude, latitude, pollutionData };
        } else {
          throw new Error(`Failed to fetch weather data: ${data.message}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Function to fetch pollution data from OpenWeatherMap API
    async function fetchPollutionData(latitude, longitude) {
      const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey1}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          // Extract pollution data
          const aqi = data.list[0].main.aqi;
          const pm2_5 = data.list[0].components.pm2_5;
          const pm10 = data.list[0].components.pm10;
          const so2 = data.list[0].components.so2;
          const no2 = data.list[0].components.no2;
          const co = data.list[0].components.co;
          const o3 = data.list[0].components.o3;

          return { aqi, pm2_5, pm10, so2, no2, co, o3 };
        } else {
          throw new Error(`Failed to fetch pollution data: ${data.message}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Function to handle form submission
    function handleSubmit() {
      const city = document.getElementById('cityInput').value;
      fetchWeatherData(city)
        .then(({ longitude, latitude, pollutionData }) => {
          document.getElementById('result').innerHTML = `Longitude: ${longitude}<br>
		  Latitude: ${latitude}<br>
		  AQI: ${pollutionData.aqi}<br>
		  PM2.5: ${pollutionData.pm2_5}<br>
		  PM10: ${pollutionData.pm10}<br>
		  SO2: ${pollutionData.so2}<br>
		  NO2: ${pollutionData.no2}<br>
		  CO: ${pollutionData.co}<br>
		  O3: ${pollutionData.o3}`;
        })
        .catch(error => {
          console.error(error);
          document.getElementById('result').innerHTML = 'Error: ' + error.message;
        });
    }
	
const getVenues = async () => {
	const city = $input.val();
	const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;
	// add try and catch
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			const venues = jsonResponse.response.groups[0].items.map((item) => item.venue);
			console.log(venues);
			return venues;
		}
	} catch (error) {
		console.log(error);
	}
};
$(document).ready(function() {
	if ("geolocation" in navigator) {
	  navigator.geolocation.getCurrentPosition(function(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		$(document).ready(function(){
			var originalHref = $("#click2").attr("href");
			$("#click2").click(function(){
				var userInput = $input.val();
				var newHref = originalHref.replace("dir/", "dir/" + latitude+","+longitude+ "/" + userInput);
				$(this).attr("href", newHref);
			  });
			});
			/*$(document).ready(function(){
				var originalHref1 = $("#click11").attr("href");
			  $("#click11").click(function(){
				  var userInput1 = $input.val();
				  var newHref1 = originalHref1.replace("dir/", "dir/" + latitude+","+longitude+ "/" + userInput1);
				  $(this).attr("href", newHref1);
				});
			  });*/
	  });
	} else {
	  $("#location").text("Geolocation is not supported by your browser.");
	}
  });
  $(document).ready(function() {
	if ("geolocation" in navigator) {
	  navigator.geolocation.getCurrentPosition(function(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		/*$(document).ready(function(){
			var originalHref = $("#click11").attr("href");
			$("#click2").click(function(){
				var userInput = $input.val();
				var newHref = originalHref.replace("dir/", "dir/" + latitude+","+longitude+ "/" + userInput);
				$(this).attr("href", newHref);
			  });
			});*/
			$(document).ready(function(){
				var originalHref1 = $("#click11").attr("href");
			  $("#click11").click(function(){
				  var userInput1 = $input.val();
				  var newHref1 = originalHref1.replace("dir/", "dir/" + latitude+","+longitude+ "/" + userInput1);
				  $(this).attr("href", newHref1);
				});
			  });
	  });
	} else {
	  $("#location").text("Geolocation is not supported by your browser.");
	}
  });
// get Data from OpenWeather
const getForecast = async () => {
	const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			return jsonResponse;
		}
	} catch (error) {
		console.log(error);
	}
};
const get5dayForecast = async () => {
	const urlToFetch = `${weatherUrl1}?&q=${$input.val()}&appid=${openWeatherKey1}`;
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			return jsonResponse;
		}
	} catch (error) {
		console.log(error);
	}
};

// Render functions
const renderVenues = (venues) => {
	$venueDivs.forEach(($venue, index) => {
		const venue = venues[index];
		const venueIcon = venue.categories[0].icon;
		const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
		let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc,index);
			$venue.append(venueContent);
	});
	$destination.append(`<h2>${venues[0].location.city}</h2>`);
};
/*const renderbackground = (backg) => {
	const backgroundContent = createWeatherHTML3(backg);
	$back1.append( backgroundContent);
};*/
const renderForecast12= (day1) => {
	const weatherContent12 = createWeatherHTML12(day1);
	$weatherDiv12.append(weatherContent12);
};
const renderForecast = (day) => {
	const weatherContent = createWeatherHTML(day);
	$weatherDiv.append(weatherContent);
};
const renderForecast1 = (day1) => {
	const weatherContent1 = createWeatherHTML1(day1);
	$weatherDiv1.append(weatherContent1);
};
const renderForecast2 = (day2) => {
	const weatherContent2 = createWeatherHTML2(day2);
	$weatherDiv2.append(weatherContent2);
};
const renderForecast3 = (day3) => {
	const weatherContent3 = createWeatherHTML3(day3);
	$weatherDiv3.append(weatherContent3);
};
const renderForecast4 = (day4) => {
	const weatherContent4 = createWeatherHTML4(day4);
	$weatherDiv4.append(weatherContent4);
};
const renderForecast5 = (day5) => {
	const weatherContent5 = createWeatherHTML5(day5);
	$weatherDiv5.append(weatherContent5);
};

const executeSearch = () => {
/*$(document).ready(function(){
	var originalHref = $("#click2").attr("href");
	$("#click2").click(function(){
		var userInput = $input.val();
		var newHref = originalHref.replace("3/", "3/" + userInput);
		$(this).attr("href", newHref);
	  });
	});*/
	return false;
};
const executeSearch1 = () => {
	//$container.empty();
	$container1.remove();
	$container2.remove();
	//$container.css('visibility', 'hidden');
	$(document).ready(function() {
		$container0.append($container);
		//$container0.append($weatherDiv);
	  });
	//$container1.remove();
	$container.css('visibility', 'visible');
	$weatherDiv.empty();
	$weatherDiv1.empty();
	$weatherDiv2.empty();
	$weatherDiv3.empty();
	$weatherDiv4.empty();
	$weatherDiv5.empty();
	getForecast().then((forecast) => renderForecast(forecast));
	get5dayForecast().then((weather) => renderForecast1(weather));
	get5dayForecast().then((weather2) => renderForecast2(weather2));
	get5dayForecast().then((weather3) => renderForecast3(weather3));
	get5dayForecast().then((weather4) => renderForecast4(weather4));
	get5dayForecast().then((weather5) => renderForecast5(weather5));
	//$weatherDiv.remove();
	return false;
}
const executeSearch2 = () => {
	$container.remove();
	$container2.remove();
	$(document).ready(function() {
		$container0.append($container1);
	  });
	 $venueDivs.forEach((venue) => venue.empty());
	$container1.css('visibility', 'visible');
	getVenues().then((venues) => renderVenues(venues));
	//$container.add();
	return false;
}
const executeSearch3 = () => {
	$container.remove();
	$container1.remove();
	$(document).ready(function() {
		$container0.append($container2);
	  });
	$container2.css('visibility', 'visible');
	
}
$submit.click(executeSearch);
$new.click(executeSearch1);
$new1.click(executeSearch2);
$new2.click(executeSearch3);