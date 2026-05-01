var form = document.getElementById("tripForm");
var destination = document.getElementById("destination");
var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
var budget = document.getElementById("budget");
var travelType = document.getElementById("travelType");
var notes = document.getElementById("notes");
var message = document.getElementById("message");
var tripList = document.getElementById("tripList");
var emptyMessage = document.getElementById("emptyMessage");

var trips = JSON.parse(localStorage.getItem("trips")) || [];
showTrips();

form.onsubmit = function (e) {
  e.preventDefault();

  if (destination.value === "" || startDate.value === "" || endDate.value === "" || budget.value === "") {
    message.textContent = "Fill all fields";
    return;
  }

  if (endDate.value < startDate.value) {
    message.textContent = "End date is wrong";
    return;
  }

  var trip = {
    id: Date.now(),
    destination: destination.value,
    startDate: startDate.value,
    endDate: endDate.value,
    budget: budget.value,
    travelType: travelType.value,
    notes: notes.value
  };

  trips.push(trip);
  localStorage.setItem("trips", JSON.stringify(trips));

  form.reset();
  message.textContent = "Trip saved";
  showTrips();
};

function showTrips() {
  tripList.innerHTML = "";

  if (trips.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }

  for (var i = 0; i < trips.length; i++) {
    tripList.innerHTML +=
      "<div class='trip'>" +
      "<h3>" + trips[i].destination + "</h3>" +
      "<p>" + trips[i].startDate + " to " + trips[i].endDate + "</p>" +
      "<p>Budget: " + trips[i].budget + "</p>" +
      "<p>Type: " + trips[i].travelType + "</p>" +
      "<p>Notes: " + trips[i].notes + "</p>" +
      "<button onclick='deleteTrip(" + trips[i].id + ")'>Delete</button>" +
      "</div>";
  }
}

function deleteTrip(id) {
  var newTrips = [];

  for (var i = 0; i < trips.length; i++) {
    if (trips[i].id !== id) {
      newTrips.push(trips[i]);
    }
  }

  trips = newTrips;
  localStorage.setItem("trips", JSON.stringify(trips));
  showTrips();
}