const mymap = L.map('checkinMap').setView([5, 5], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

//   for (let item of data) {
//     const marker = L.marker([item.lat, item.lon]).addTo(mymap);
//     let txt = `The weather here at ${item.lat}&deg;,
//     ${item.lon}&deg; is `
    
//     marker.bindPopup(txt);
//   }
  console.log(data);
}
