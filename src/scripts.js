import './css/styles.css';
import apiObject from '../apiCalls';
import Booking from './classes/Booking';
import Room from './classes/Room';
import Customer from './classes/Customer';
import datepicker from 'js-datepicker';
import './images/hotel-logo.png';

const calendar = document.getElementById("calendar") 
const dateSubmitButton = document.getElementById("dateSubmit") 
const dashboardPage = document.getElementById("dashboardPage") 
const resultsPage = document.getElementById("resultsPage") 
const homeButton = document.getElementById("homeButton") 
let bookingData, roomData, customerData

dateSubmitButton.addEventListener("click", displayRooms)
homeButton.addEventListener("click", gohome)


//functions
apiObject.getAllPromises().then(data => {
  bookingData = data[0].bookings;
  roomData = data[1].rooms;
  customerData = data[2].customers;
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

function gohome(){
  scroll(0,0)
  calendar.value = ""
  toggleView(dashboardPage, "show")
  toggleView(resultsPage, "hide")
}

function displayRooms(e){
  e.preventDefault()
  if(calendar.value){
    scroll(0,0)
    toggleView(dashboardPage, "hide")
    toggleView(resultsPage, "show")
  }
}