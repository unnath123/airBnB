function createListingCard(listing) {
    // Before creating the listingCard
    const listingLocation = `${listing.latitude},${listing.longitude}`;

    fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLocation.lat},${userLocation.lng}&destinations=${listingLocation}&key=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            const distance = data.rows[0].elements[0].distance.text;

            // Now create the listingCard and include the distance in the information
            const listingCard = document.createElement("div");
           

            listingCard.innerHTML = `
            
                <p>Distance from you: ${distance}</p>
             
            `;

        
        });
}