import './css/styles.css';
import datepicker from 'js-datepicker';
import './images/hotel-logo.png';

// console.log('This is the JavaScript entry file - your code begins here.');
const calendar = document.getElementById("calendar") 
const dateDisplay = document.querySelector('#calendar[type="date"]');
// const dateSubmitButton = document.getElementById("dateSubmit") 

const picker = datepicker(calendar, {
  formatter: (calendar, date) => {
    let monthString = (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2});
    let allString = date.toString().split(" ");
    let formatDate = `${allString[3]}-${monthString}-${allString[2]}`;
    calendar.value = formatDate 
  }
})

picker.formatter(calendar, new Date())




