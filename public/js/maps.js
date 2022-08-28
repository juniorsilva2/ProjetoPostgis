let map;
let marker;

//Ponto inicial em Sousa
let center = { lat: -6.763457123548206, lng: -38.23877402576849};

function initMap() {

  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 14,
  });
  
  marker = new google.maps.Marker({
    map: map,
    draggable: true,
  });

  map.addListener("click", (evt) => {
    addMarker(evt);
  });

  marker.addListener("position_changed", () => {
    map.setCenter(marker.position);
  });
}

function addMarker(evt) {
  marker.setPosition(evt.latLng);
}

//Salva o ponto no postgis
function save() {
  const obj = {
    nome: document.getElementById("nome").value,
    lat: marker.getPosition().lat(),
    lng: marker.getPosition().lng(),
  };

  fetch("http://localhost:8001/addPetshop", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      alert("Inserido!");
    })
    .catch((error) => alert("Falha ao salvar!"));
}





async function destiny(){

  let busca = document.getElementById('busca').value;


  try {

    const obj = {
      nome: busca
    }

    let response = await fetch('http://localhost:8001/selectPetshop/' + busca);
    response = await response.json();
  
    if ( response.message ) {

      alert(response.message);

    } else {

    const data = response.coordinates;

    const point = {
      lat: data[0],
      lng: data[1],
    };

    
    map = new google.maps.Map(document.getElementById("map"), {
      center: point,
      zoom: 14,
    });

    const marker = new google.maps.Marker({
      map: map,
      position: point,
    });

    map.addListener("center_changed", () => {
      window.setTimeout(() => {
        map.panTo(marker.getPosition());
      }, 3000);
    });

    marker.addListener("click", () => {
      map.setZoom(8);
      map.setCenter(marker.getPosition());
    });}

 

  } catch (err){

    console.log(err)

  }
}
