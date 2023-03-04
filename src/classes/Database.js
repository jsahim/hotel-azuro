import Room from "./Room";
import Booking from "./Booking";
import Customer from "./Customer";

class Database {
  constructor(bookingsArray, roomsArray, customersArray){
    this.bookings = bookingsArray.map(bookObj => new Booking(bookObj))
    this.rooms = roomsArray.map(roomObj => new Room(roomObj))
    this.customers = customersArray.map(cusObj => new Customer(cusObj))
  }
  filterRooms(selectedOption){
    if(selectedOption === "all rooms"){
      return this.rooms 
    } else {
      let filteredRooms = this.rooms.filter(room => room.type === selectedOption)
      return filteredRooms
    }
  }
}

export default Database