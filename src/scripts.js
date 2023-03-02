// This is the JavaScript entry file - your code begins here

// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import datepicker from 'js-datepicker';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/hotel-logo.png';
const calendar = document.getElementById("calendar") 
const dateSubmitButton = document.getElementById("dateSubmit") 
const picker = datepicker(calendar)
let selectedDate;

// console.log('This is the JavaScript entry file - your code begins here.');

dateSubmitButton.addEventListener("click", getDate)


function getDate(event){
  event.preventDefault()
  console.log(picker);
  selectedDate
}



