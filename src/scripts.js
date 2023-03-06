import './css/styles.css';
import apiObject from '../apiCalls';
import Database from './classes/Database';
import Booking from './classes/Booking';
import datepicker from 'js-datepicker';
import MicroModal from 'micromodal'; 
import './images/hotel-logo.png';
import './images/hotel-image.png';
import './images/residential-suite.png';
import './images/suite.png';
import './images/single-room.png';
import './images/junior-suite.png';
import './images/bidet-icon.png';
import './images/twin-icon.png';
import './images/king-icon.png';
import './images/queen-icon.png';
import './images/full-icon.png';


const loginView = document.getElementById("loginView") 
const primeView = document.getElementById("primeView") 
const userField = document.getElementById("userField") 
const passwordField = document.getElementById("passwordField") 
const loginButton = document.getElementById("loginButton") 
const calendar = document.getElementById("calendar") 
const dateSubmitButton = document.getElementById("dateSubmit") 
const homeButton = document.getElementById("homeButton") 
const modal = document.getElementById("modal-1") 
const resultsContainer = document.getElementById('resultsDisplay');
const dashboardPage = document.getElementById("dashboardPage") 
const filterBar = document.getElementById("filters")
const resultsPage = document.getElementById("resultsPage") 
const resultsDisplay = document.getElementById("resultsDisplay") 
const body = document.querySelector('body');
let bookingData, roomsData, customersData, hotelDatabase, currentUser


body.addEventListener('keydown', (e) => e.key === "Escape" && modal.classList.contains("is-open") ? goHome() : null)
loginButton.addEventListener("click", verifyLogin)
homeButton.addEventListener("click", goHome)
dateSubmitButton.addEventListener("click", showRoomsPage)
modal.addEventListener("click", goHome)
filterBar.addEventListener("change", function() { 
  displayRooms(hotelDatabase.filterRoomType(this.value))
})
resultsContainer.addEventListener('click', (e) => {
  const isButton = e.target.nodeName === 'BUTTON';
  if(isButton){
    createNewBooking(e.target.id, calendar.value, currentUser)
    setTimeout(() => {
      createConfirmation(e.target.id, calendar.value)
    }, 500);
  } 
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
  minDate: new Date(),
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
    displayUserDetails()
  }
}

function displayUserDetails(){
  let userInst = hotelDatabase.customers.find(customer => customer.id === currentUser.id)
  userInst.allBookings = hotelDatabase.bookings.filter(booking => booking.userID === userInst.id)
  userInst.getTotalSpent(hotelDatabase.rooms)
  document.getElementById("navNameInsert").innerText = userInst.name
  document.getElementById("pointInsert").innerText = `${userInst.getPointsEarned()} points`
  document.getElementById("homeNameInsert").innerText = userInst.getFirstName()
  document.getElementById("pointsAccrued").innerText = userInst.getPointsEarned()
  document.getElementById("memberLevel").innerText = userInst.getMemberLevel()
  document.getElementById("moneySpent").innerText = `$${userInst.totalSpend}`
  displayUserBookings(userInst)
}

function displayUserBookings(userInst){
  let userBookings = userInst.sortBookings()
  let dateDetails, roomDetails
  document.getElementById("upcomingStayDisplay").innerHTML = ""
  document.getElementById("pastStayDisplay").innerHTML = ""
  userBookings.futureStays.forEach(fBooking => {
    dateDetails = hotelDatabase.getDateDetails(fBooking.date)
    roomDetails = hotelDatabase.getRoomDetails(fBooking.roomNumber)
    document.getElementById("upcomingStayDisplay").innerHTML += `<p>${dateDetails} ║ ${roomDetails}</p>`
  })
  userBookings.pastStays.forEach(pBooking => {
    dateDetails = hotelDatabase.getDateDetails(pBooking.date)
    roomDetails = hotelDatabase.getRoomDetails(pBooking.roomNumber)
    document.getElementById("pastStayDisplay").innerHTML += `<p>${dateDetails} ║ ${roomDetails}</p>`
  })
}

function goHome(){
  body.classList.remove('no-scroll');
  scroll(0,0)
  calendar.value = ""
  displayUserDetails()
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
  let bedWord, bedString, bidetWord
  if(matchRooms.length > 0){
    matchRooms.forEach(room => {
      room.hasBidet ? bidetWord = 'bidet-icon' :  bidetWord = 'bidet-icon hidden'
      bedString = `<img class="icon" src="./images/${room.bedSize}-icon.png" alt="${room.bedSize} icon">`
      room.numBeds === 1 ? bedWord = "Bed" : bedWord = "Beds"
      resultsDisplay.innerHTML += 
      `<article class="room-option" id="room${room.number}">
        <img class"room-image" src="${room.createImagePath()}" alt="${room.type} image">
        <div class"room-description">
          <h3>${room.formatType()}</h3>
          <p>${room.numBeds} ${room.formatBedSize()} ${bedWord}</p>
          <div class="icons-container">
            <div class="beds-container">${bedString.repeat(room.numBeds)}</div>
            <div class=${bidetWord}><img class="icon" src="./images/bidet-icon.png" alt="bidet icon"></div>
          </div>
        </div>
        <div class"book-details">
          <h3 class="price-header">$${room.formatPrice()}<br><span>per night</span></h3>
          <button class="book-button" id="bookButton${room.number}">BOOK NOW</button>
        </div>
      </article>`
    })
  } else {
    resultsDisplay.innerHTML = "<p>Our sincerest apologies, but there are no rooms available on the date you selected, please adjust your search.</p>"
  }
}

function createNewBooking(buttonID, dateSelect, currentUser) {
  let roomNum = +(buttonID.split("n")[1])
  let dateFix = dateSelect.replaceAll("-","/")
  apiObject.apiRequest("bookings","POST", currentUser.id, dateFix, roomNum);
  apiObject.apiRequest("bookings").then(bookData => {
    hotelDatabase.bookings = bookData.bookings.map(bookObj => new Booking(bookObj))
    return hotelDatabase.bookings 
  });
}

function createConfirmation(buttonID, dateSelect){
  let roomNum = +(buttonID.split("n")[1])
  console.log(roomNum)
  let dateString = dateSelect.replaceAll("-", "/")
  let book = hotelDatabase.bookings.find(book => book.date === dateString && book.roomNumber === roomNum)
  let foundRoom = hotelDatabase.rooms.find(rm => rm.number === roomNum)
  console.log(book, foundRoom)
  document.getElementById("confDate").innerText = ` ${dateString}`
  document.getElementById("confRoom").innerText = ` ${foundRoom.type}`
  document.getElementById("confBeds").innerText = ` ${foundRoom.bedSize}-${foundRoom.numBeds}`
  document.getElementById("confCode").innerText = ` ${book.code}`
  body.classList.add('no-scroll');
  MicroModal.show('modal-1');
}