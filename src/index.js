const ramenMenuDiv = document.getElementById("ramen-menu");
document.getElementById("new-ramen").addEventListener("submit", newRamen);

// Fetch existing ramen data and display it
fetch("http://localhost:3001/ramens")
  .then(response => response.json())
  .then(data => {
    data.forEach(ramen => {
      displayRamen(ramen);
    });
  })
  .catch(err => console.log(err));

// Function to display each ramen's image in the ramen menu
function displayRamen(ramen) {
  const ramenImageElement = document.createElement("img");
  ramenImageElement.src = ramen.image;
  ramenImageElement.alt = ramen.name;
  
  ramenMenuDiv.append(ramenImageElement);

  // Add click event to each image to display ramen details
  ramenImageElement.addEventListener("click", () => clickHand(ramen));
}

// Function to display ramen details when clicked
function clickHand(ramen) {
  document.querySelector(".detail-image").src = ramen.image;
  document.querySelector(".detail-image").alt = ramen.name;  
  document.getElementById("name-name").textContent = ramen.name;
  document.getElementById("restaurant-name").textContent = ramen.restaurant;
  document.getElementById("rating-display").textContent = ramen.rating;
  document.getElementById("comment-display").textContent = ramen.comment;
}

// Function to handle form submission and add new ramen
function newRamen(e) {
  e.preventDefault();

  // Collect form data
  const newRamenForm = new FormData(e.target);
  const newRamen = {
    name: newRamenForm.get("name"),
    restaurant: newRamenForm.get("restaurant"),
    image: newRamenForm.get("image"),
    rating: newRamenForm.get("rating"),
    comment: newRamenForm.get("comment")
  };

  // Send POST request to add the new ramen
  fetch("http://localhost:3001/ramens", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newRamen)
  })
    .then(res => res.json())
    .then(addedRamen => {
      // Display the newly added ramen without reloading the page
      displayRamen(addedRamen);
      // Reset the form fields
      e.target.reset();
    })
    .catch(err => console.log("Error adding ramen:", err));
}