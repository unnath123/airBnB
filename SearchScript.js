const brr = JSON.parse(localStorage.getItem("ResultArray"));
// const results = "results";
const arr = brr.results;
let map;
initMap()

console.log(arr);


function renderUI() {
  const listing = document.getElementById("Listings");

  for (let i = 0; i < 8; i++) {
    const block = document.createElement("div");
    block.className = "block1";
    block.innerHTML = `
        <div class="listing-image">
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
                                    <p>${arr[i].persons} guests · Entire Home · ${arr[i].beds} beds · ${arr[i].bathrooms} bath</p>
                                    <p>Wifi · Kitchen · Free Parking</p>
                                </div>
                                <div class="listingDivider"></div>
                                <div class="desc3">
                                    <div class="desc3-one"><p>${arr[i].rating}<i class="fa-solid fa-star" style="color: #fddc08;"></i> (${arr[i].reviewsCount}reviews)</p></div>
                                    <div class="desc3-two"><p>${arr[i].price.rate}$ / night</p></div>
                                </div>
                            </div>
                            
                            `;

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

renderUI();



async function initMap() {
  // The location of Uluru
  const position = { lat:  12.92974, lng: 75.80003 };
//   const position1 = { lat: 12.94582, lng: 75.78859 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
//   const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
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
        title: "sak",
      });
}




