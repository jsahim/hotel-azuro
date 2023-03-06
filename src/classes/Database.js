import Room from "./Room";
import Booking from "./Booking";
import Customer from "./Customer";

class Database {
  constructor(bookingsArray, roomsArray, customersArray){
    this.bookings = bookingsArray.map(bookObj => new Booking(bookObj))
    this.rooms = roomsArray.map(roomObj => new Room(roomObj))
    this.customers = customersArray.map(cusObj => new Customer(cusObj))
    this.availRooms = null
  }
  filterRoomDate(selectDate){
    this.availRooms = []
    let matchBookings = this.bookings
    .filter(booking => booking.date === selectDate)
    .map(booking => booking.roomNumber)
    this.rooms.forEach(room => {
      if(!matchBookings.includes(room.number)){
        this.availRooms.push(room)
      }
    })
    return this.availRooms
  }
  filterRoomType(selectedOption){
    if(selectedOption === "all rooms"){
      return this.availRooms
    } 
    return this.availRooms.filter(room => room.type === selectedOption)
  }
  getDateDetails(date){
    let monthList = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    let day, month, year, initialDate
    initialDate = date.split("/")
    day = +(initialDate[2])
    month = monthList[(+(initialDate[1])-1)]
    year = initialDate[0]
    let formattedDate = `${month} ${day}, ${year}`
    return formattedDate
  }
  getRoomDetails(roomNum){
    let foundRoom = this.rooms.find(room => room.number === roomNum)
    let formattedDate = `${foundRoom.type}${foundRoom.numBeds}-${foundRoom.bedSize}`
    return formattedDate
  }
}

export default Database