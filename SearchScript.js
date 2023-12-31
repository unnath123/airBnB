
// const results = "results";
// const arr = brr.results;
// let arr;
let map;
// let userLocation;
// initMap()


async function SecondpageSearch(){
  const searchVal = document.getElementById("PlaceName").value;
  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;
  const numGuest = document.getElementById("GuestN").value;
  // let crr;
  
    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchVal}&checkin=${checkIn}&checkout=${checkOut}&adults=${numGuest}&children=0&infants=0&pets=0&page=1&currency=USD`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '408f14ced5mshff03e33a8cb0907p109ecejsn22610675766d',
		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
	}
};

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        const crr = result.results
        initMap();
        CreateListCards(crr)
        localStorage.clear()
        localStorage.setItem("ResultArray",JSON.stringify(result))

    } catch (error) {
        console.error(error);
    }
  
}

document.getElementById("SecpageBtn").addEventListener("click",SecondpageSearch)


// console.log(arr);

function CalculateDistance(listingLocation){
  let userLocation;
  let lati;
  let longi;
  // function getUserLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        //  userLocation = {
              lati = position.coords.latitude
              longi = position.coords.longitude
          // };
      });
  }
  // }
  let distance;
  fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${lati},${longi}&destinations=${listingLocation}&key=AIzaSyCXA297gtsXAQSR_gBL_17HHuk4ZmR4IuA`)
        .then(response => response.json())
        .then(data => {
            distance = data.rows[0].elements[0].distance.text;

        });
        return distance;
}


function showBookingCostBreakdown(listing){
  // listing={price:{
  //   rate:100
  // }}
  const additionalFees = listing.rate * 0.10; // Assuming additional fees are 10% of base price
  const totalCost = listing.rate + additionalFees;

  // Create a modal dialog box
  const modal = document.createElement("div");
  modal.className = "modl"
  modal.style.display = "block";
  modal.style.width = "300px";
  modal.style.height = "200px";
  modal.style.backgroundColor = "#fff";
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.padding = "20px";
  modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
  modal.style.borderRadius = "10px"

  // Add booking cost breakdown to the modal
  modal.innerHTML = `
      <h2>Booking Cost Breakdown</h2>
      <p>Base Rate: rs ${listing.rate.toFixed(2)}</p>
      <p>Additional Fees: rs ${additionalFees.toFixed(2)}</p>
      <p>Total Cost: rs   ${totalCost.toFixed(2)}</p>
  `;

  // Add a close button to the modal
  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", () => modal.style.display = "none");
  modal.appendChild(closeButton);

  // Add the modal to the body
  document.body.appendChild(modal);
}

function GetDirections(latlong){
//  let latlong = { latitude:  12.92974, longitude: 75.80003 };
  const url = `https://www.google.com/maps/dir//${latlong.latitude},${latlong.longitude}`;
  window.open(url, "_blank");
}

function CreateListCards(arr) {
  const listing = document.getElementById("Listings");
  console.log(arr[0].name)

  listing.innerHTML =" ";
  
  for (let i = 0; i < 10; i++) {
    const listingLocation = `${arr[i].lat},${arr[i].lng}`;
    const distance = 20;
    let SH = arr[i].isSuperhost;
    // CalculateDistance(listingLocation);
    let latlng = {latitude:arr[i].lat,
                  longitude:arr[i].lng}

    const block = document.createElement("div");
    block.className = "block1";
    block.innerHTML = `
        <div class="listing-image" id="listing-img${i}">
                                <img src="${arr[i].images[0]}" alt="">
                            
                            </div>
                            <div class="listing-desc">
                                <div class="desc1">
                                    <div class="desc1-one">
                                        <p class="ds-1">${arr[i].type}</p>
                                        <p class="ds-2">${arr[i].name}</p>
                                    </div>
                                   
                                    <div class="heart"><img src="./searchpage/heart.png" alt=""></div>
                                </div>
                                <div class="listingDivider"></div>
                                <div class="desc2">
                                    <p>${arr[i].persons} guests · Free Parking · ${arr[i].beds} beds · ${arr[i].bathrooms} bath</p>
                                    <p>Wifi · Kitchen · ${distance}km Distance from you</p>
                                </div>
                                <div class="listingDivider"></div>
                                <div class="desc3">
                                    <div class="desc3-one"><p>${arr[i].rating}<i class="fa-solid fa-star" style="color: #fddc08;"></i> (${arr[i].reviewsCount}reviews)</p></div>
                                    <div>
                                      <button class="Mapbutton" onclick='GetDirections(${JSON.stringify(latlng)})'>Get Directions</button>
                                    </div>
                                    <div class="desc3-two"><button class="costBDn" onclick='showBookingCostBreakdown(${JSON.stringify(arr[i].price)})'>${(arr[i].price.rate)*80}rs / night</button></div>
                                </div>
                            </div>
                            
                            `;
                  
    // createSuperHost div
    // if(arr[i].)
    if(arr[i].rareFind){
      const rareFinddiv = document.createElement("div")
      rareFinddiv.className = "superHost";
      rareFinddiv.innerHTML = `
      <p>rareFind</p>
      `
      block.appendChild(rareFinddiv);
    }
    else if(SH){
      const SuperHostdiv = document.createElement("div")
      SuperHostdiv.className = "superHost";
      SuperHostdiv.innerHTML = `
      <p>Superhost</p>
      `
      block.appendChild(SuperHostdiv);
    }
    

    // render marker on map for the location
    let pos ={ lat:  arr[i].lat, lng: arr[i].lng };
    renderMarker(pos);
    // <div class="block-divider"></div>
    const divider = document.createElement("div");
    divider.className = "block-divider";
    // block.appendChild(divider)
    listing.append(block,divider)
  }
}
// CreateListCards();



async function initMap() {
  const position = { lat:  12.92974, lng: 75.80003 };

  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    zoom: 15,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

//   const marker = new AdvancedMarkerElement({
//     map: map,
//     position: position,
//     title: "sak",
//   });

//   const marker1 = new AdvancedMarkerElement({
//     map: map,
//     position: position1,
//     title: "sak",
//   });
}
// initMap();
async function renderMarker(pos){
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const marker1 = new AdvancedMarkerElement({
        map: map,
        position: pos,
        title: "stay", 
      });
}

// function getUserLocation(){
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(position => {
//        userLocation = {
//             latitud: position.coords.latitude,
//             longitud: position.coords.longitude
//         };
//     });
// }
// }

//  window.onload = function(){
  // getUserLocation()
  const brr = JSON.parse(localStorage.getItem("ResultArray"));
  const drr = brr.results;

  initMap();

  CreateListCards(drr)

// }
