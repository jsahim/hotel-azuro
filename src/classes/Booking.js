class Booking {
  constructor(bookingObj){
    this.code = bookingObj.id
    this.userID = bookingObj.userID
    this.date = bookingObj.date
    this.roomNumber = bookingObj.roomNumber
  }
  formatDate(){
    return this.date.replaceAll("/" ,"-")
  }
}

export default Booking