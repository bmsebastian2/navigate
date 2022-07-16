console.log("App anexada");
const latitud = document.getElementById("latitud");
const longitud = document.getElementById("longitud");
const error = document.getElementById("error");
const ubicacion = document.getElementById("ubicacion");
const distrito = document.getElementById("distrito");
const cit = document.getElementById("city");
const country = document.getElementById("countryName");

let stree_t = document.getElementById("street");
let postalCod_e = document.getElementById("postalCode");
let houseNumbe_r = document.getElementById("houseNumber");

const opciones = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};
const gpsOptions = { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 };

let la = "";
let lo = "";

const localizar = document.getElementById("localizar");
const botonUbicacion = document.getElementById("botonUbicacion");

const showPosition = (position) => {
  la = position.coords.latitude;
  lo = position.coords.longitude;
  latitud.innerText = la;
  longitud.innerText = lo;
};
function gpsError(err) {
  console.warn(`Error: ${err.code}, ${err.message}`);
}

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(showPosition, gpsError, opciones);
};

const getUbicacion = () => {
  if (la && lo) {
    fetch(
      `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${la},${lo}&lang=en-US&apikey=1W9Uzy8_P4PvjP1ZfO6NkAbCRyuuL0D3uXqMDvzLer8`
    )
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data.items[0].address.district);
        const { houseNumber, postalCode, street, countryName, city, district } =
          data.items[0].address;

        country.innerText = countryName;
        cit.innerText = city;
        distrito.innerText = district;
        stree_t.innerText = street;
        postalCod_e.innerText = postalCode;
        houseNumbe_r = houseNumber;
      })
      .catch((err) => console.log("Solicitud fallida: " + err));
  } else alert("Debe llenat latitud y longitud");
};
localizar.addEventListener("click", getLocation);
botonUbicacion.addEventListener("click", getUbicacion);
