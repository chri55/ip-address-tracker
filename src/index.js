import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

function performSearch(e) {
  if (e) e.preventDefault();
  const currentSearchVal = formInput.value == "" ? '8.8.8.8' : formInput.value;
  const config = {
    "method": "get",
    "url" : `https://geo.ipify.org/api/v1?apiKey=${process.env.API_KEY}&ipAddress=${currentSearchVal}`,
  }
  axios(config)
  .then(({data}) => {
    if (data.code || !data.ip) {
      console.log(`Error: ${data.messages}`);
      return;
    }
    document.querySelector("#ip").innerHTML = data.ip;
    document.querySelector("#location").innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
    document.querySelector("#timezone").innerHTML = `UTC ${data.location.timezone}`;
    document.querySelector("#isp").innerHTML = data.isp;
    mymap.setView([data.location.lat, data.location.lng]);
    currMarker.markerRef.setLatLng([data.location.lat, data.location.lng]);
  });
}
const formInput = document.querySelector("#ip-search");
const form = document.querySelector("#search-form");
form.addEventListener("submit", performSearch);

//performSearch();

var currMarker = {
  lat: 51.505,
  lon: -0.09,
  markerRef: null,
} 
const mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
  }).addTo(mymap);
const locationIcon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});
currMarker.markerRef = L.marker([51.505, -0.09], {
  icon: locationIcon,
}).addTo(mymap);
