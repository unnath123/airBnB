let location1 = { latitude:  12.92974, longitude: 75.80003 };
function openDirections() {
    // Open Google Maps directions in a new tab
    const url = `https://www.google.com/maps/dir//${location1.latitude},${location1.longitude}`;
    window.open(url, "_blank");
}



document.getElementById("renderMap").addEventListener("click",openDirections);