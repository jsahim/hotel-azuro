import './css/styles.css';
import datepicker from 'js-datepicker';
import './images/hotel-logo.png';

const calendar = document.getElementById("calendar") 
const dateSubmitButton = document.getElementById("dateSubmit") 
const dashboardPage = document.getElementById("dashboardPage") 
const resultsPage = document.getElementById("resultsPage") 
const picker = datepicker(calendar, {
  formatter: (calendar, date) => {
    let monthStr, dayStr, yearStr
    monthStr = (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2});
    dayStr = date.toString().split(" ")[2];
    yearStr = date.toString().split(" ")[3];
    const formattedDate = `${yearStr}-${monthStr}-${dayStr}`;
    calendar.value = formattedDate
  }
})

dateSubmitButton.addEventListener("click", displayRooms)

function toggleView(element, action){
action === "hide" ? element.classList.add("hidden") : element.classList.remove("hidden")
}

function displayRooms(e){
  e.preventDefault()
  if(calendar.value){
    toggleView(dashboardPage, "hide")
    toggleView(resultsPage, "show")
  }
}