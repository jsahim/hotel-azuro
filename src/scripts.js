import './css/styles.css';
import apiObject from '../apiCalls';
import Database from './classes/Database';
import datepicker from 'js-datepicker';
import './images/residential-suite.png';
import './images/suite.png';
import './images/single-room.png';
import './images/junior-suite.png';

const loginView = document.getElementById("loginView") 
const primeView = document.getElementById("primeView") 
const userField = document.getElementById("userField") 
const passwordField = document.getElementById("passwordField") 
const loginButton = document.getElementById("loginButton") 
const calendar = document.getElementById("calendar") 
const dateSubmitButton = document.getElementById("dateSubmit") 
const homeButton = document.getElementById("homeButton") 
const resultsContainer = document.getElementById('resultsDisplay');
const dashboardPage = document.getElementById("dashboardPage") 
const filterBar = document.getElementById("filters")
const resultsPage = document.getElementById("resultsPage") 
const resultsDisplay = document.getElementById("resultsDisplay") 
let bookingData, roomsData, customersData, hotelDatabase, currentUser

loginButton.addEventListener("click", verifyLogin)
homeButton.addEventListener("click", goHome)
dateSubmitButton.addEventListener("click", showRoomsPage)
filterBar.addEventListener("change", function() { 
  displayRooms(hotelDatabase.filterRoomType(this.value))
})
resultsContainer.addEventListener('click', (e) => {
  const isButton = e.target.nodeName === 'BUTTON';
  isButton ? createNewBooking(e.target.id, calendar.value, currentUser) : null
})

//functions
apiObject.getAllPromises()
.then(data => {
  bookingData = data[0].bookings;
  roomsData = data[1].rooms;
  customersData = data[2].customers;
  hotelDatabase = new Database(bookingData, roomsData, customersData)
  console.log(hotelDatabase);
});


datepicker(calendar, {
  formatter: (calendar, date) => {
    let monthStr, dayStr, yearStr
    monthStr = (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2});
    dayStr = date.toString().split(" ")[2];
    yearStr = date.toString().split(" ")[3];
    const formattedDate = `${yearStr}-${monthStr}-${dayStr}`;
    calendar.value = formattedDate
  }
})

function toggleView(element, action){
  if (action === "hide"){
    element.classList.add("hidden") 
  } else if (action === "show"){
    element.classList.remove("hidden") 
  }
}

function verifyLogin(e){
  e.preventDefault()
  const foundUser = hotelDatabase.customers.find(cust => {
    return cust.username === userField.value && cust.password === passwordField.value
  })
  if(foundUser){
    currentUser = foundUser
    toggleView(loginView, "hide")
    toggleView(primeView, "show")
    displayUserDetails(foundUser)
  }
}

function displayUserDetails(user){
  // document.getElementById("navNameInsert") = currentUser.name
  // document.getElementById("pointInsert") = currentUser.totalSpent
}


function goHome(){
  scroll(0,0)
  calendar.value = ""
  toggleView(dashboardPage, "show")
  toggleView(resultsPage, "hide")
}

function showRoomsPage(e){
  e.preventDefault()
  if(calendar.value){
    scroll(0,0)
    toggleView(dashboardPage, "hide")
    toggleView(resultsPage, "show")
    filterBar.value = "all rooms"
    let databaseDate = calendar.value.replaceAll("-","/")
    displayRooms(hotelDatabase.filterRoomDate(databaseDate))
  }
}

function displayRooms(matchRooms){
  resultsDisplay.innerHTML = ""
  if(matchRooms.length > 0){
    matchRooms.forEach(room => {
      resultsDisplay.innerHTML += 
      `<article class="room-option" id="room${room.number}">
        <img class"room-image" src="${room.createImagePath()}" alt="${room.type} image">
        <div class"room-description">
          <h3>${room.formatType()}</h3>
          <p>${room.numBeds} ${room.formatBedSize()} Beds</p>
        </div>
        <div class"book-details">
          <h3 class="price-header">$${room.formatPrice()}<br><span>per night</span></h3>
          <button class="book-button" id="bookButton${room.number}">BOOK NOW</button>
        </div>
      </article>`
    })
  } else {
    resultsDisplay.innerHTML = "<p>NO ROOMS</p>"
  }
}

function createNewBooking(buttonID, dateSelect, currentUser) {
  let roomNum = +(buttonID.split("n")[1])
  let dateFix = dateSelect.replaceAll("-","/")
  console.log(roomNum, dateFix, currentUser.id)
  apiObject.apiRequest("bookings","POST", currentUser.id, dateFix, roomNum);
  // apiObject.apiRequest("users").then(data => currentUser.recipesToCook = data.users.find(user => user.id === currentUser.id).recipesToCook);
}