import Room from "./Room";
import Booking from "./Booking";
import Customer from "./Customer";

class Database {
  constructor(bookingsArray, roomsArray, customersArray){
    this.bookings = bookingsArray.map(bookObj => new Booking(bookObj))
    this.rooms = roomsArray.map(roomObj => new Room(roomObj))
    this.customers = customersArray.map(cusObj => new Customer(cusObj))
  }
}

export default Database