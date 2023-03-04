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
    } else {
      let filteredRooms = this.availRooms.filter(room => room.type === selectedOption)
      return filteredRooms
    }
  }
}

export default Database