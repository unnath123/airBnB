
const date1 = document.getElementById("checkIn");
const date2 = document.getElementById("CheckOut");
const searchValue = document.getElementById("Search-Location");
const Nguest = document.getElementById("addGuest")

const submitbtn = document.getElementById("Search-Submit");

submitbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    GetSearchResults();
    
})

async function GetSearchResults(){
    const checkIn = date1.value;
    const checkOut = date2.value;
    const searchLocation = searchValue.value;
    const numofGuest = Nguest.value;

    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchLocation}&checkin=${checkIn}&checkout=${checkOut}&adults=${numofGuest}&children=0&infants=0&pets=0&page=1&currency=USD`;
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
        localStorage.setItem("ResultArray",JSON.stringify(result))
        location.href="./Searchpage.html";
    } catch (error) {
        console.error(error);
    }
}
