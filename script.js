function performSearch(e) {
  if (e) e.preventDefault();
  const currentSearchVal = formInput.value;
  const config = {
    "method": "get",
    "url" : `http://ip-api.com/json/${currentSearchVal}/`,
  }
  axios(config)
  .then((res) => res.data)
  .then((data) => {
    console.log(data);
    return data;
  })
  .then((data) => {
    if (data.status != "success") {
      alert(`Query Failed: ${data.message}`);
      return;
    }
    document.querySelector("#ip").innerHTML = data.query;
    document.querySelector("#location").innerHTML = `${data.city}, ${data.region} ${data.zip}`;
    document.querySelector("#timezone").innerHTML = moment.tz([2012, 0], `${data.timezone}`).format('Z z');
    document.querySelector("#isp").innerHTML = data.isp;
    mymap.setView([data.lat, data.lon]);
    currMarker.markerRef.setLatLng([data.lat, data.lon]);
  });
}

const formInput = document.querySelector("#ip-search");
const formSubmit = document.querySelector("#form-submit");
const form = document.querySelector("#search-form");
form.addEventListener("submit", performSearch);

performSearch();

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
