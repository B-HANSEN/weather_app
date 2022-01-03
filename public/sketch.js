// Geo Locate
let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    let weather;
    try {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById('latitude').textContent = lat.toFixed(2);
      document.getElementById('longitude').textContent = lon.toFixed(2);

      const api_url = `/weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      weather = json.weather;

      document.getElementById('temp').textContent = weather.current.temp_c;
      document.getElementById('city').textContent = `${weather.location.name}/ ${weather.location.region} (${weather.location.country})`;
      document.getElementById('condition').textContent = (`${weather.current.condition.text}`).toUpperCase();
      document.getElementById('timestamp').textContent = new Date(weather.dt*1000);

      const dateHelper = time => time<10 ? `0${time}` : `${time}`;
      let today = new Date();
        const YY = today.getFullYear();
        const DD = () => {
            const date = today.getDate();
            return dateHelper(date);
        }
        const MN = () => {
            const month = today.getMonth()+1;
            return dateHelper(month);
        } 
        const HH = () => {
            const hours = today.getHours();
            return dateHelper(hours);
        }
        const MM = () => {
            const mins = today.getMinutes();
            return dateHelper(mins);
        }

      document.getElementById('timestamp').textContent = weather.current.last_updated;
      document.getElementById('timeNow').textContent = `${YY}-${MN()}-${DD()} ${HH()}:${MM()}`;

    } catch (error) {
        console.error(error);
    }

    const data = { lat, lon, weather };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    await fetch('/api', options);
    // const db_response = await fetch('/api', options);
    // const db_json = await db_response.json();
    // console.log(db_json);
    });
} else {
  console.log('geolocation not available');
}
