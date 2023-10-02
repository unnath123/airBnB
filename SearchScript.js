setTimeout(() => {
    const brr = JSON.parse(localStorage.getItem("ResultArray"))
// const results = "results";
const arr = brr.results;

console.log(arr)
function renderUI(){
    const listing = document.getElementById("Listings")

    for(let i=0;i<8;i++){
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
                            
                            `
                            // <div class="block-divider"></div>
                            const divider = document.createElement("div")
                            divider.className = "block-divider"
                            // block.appendChild(divider)
    
                            listing.append(block,divider)
    }
   

}

renderUI()

}, 5000);