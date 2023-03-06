class Customer {
  constructor(userObj){
    this.id = userObj.id
    this.name = userObj.name
    this.username = `customer${this.id}`
    this.password = "overlook2021"
    this.allBookings = null
    this.totalSpend = 0
  }
  getFirstName(){
    return this.name.split(" ")[0]
  }
  getTotalSpent(roomsArray){
    this.totalSpend = this.allBookings.reduce((sum, bookObj) => {
      let foundRoom = roomsArray.find(room => room.number === bookObj.roomNumber)
      sum += foundRoom.costPerNight
      return sum
    }, 0).toFixed(2)
    return this.totalSpend
  }
  getPointsEarned(){
    return Math.round((+(this.totalSpend))) * 2
  }
  sortBookings(){
    let today = new Date().toISOString().split('T')[0].replaceAll("-" ,"/")
    console.log(today)
    return this.allBookings.reduce((acc, bookObj) => {
      if(bookObj.date >= today){
        acc.futureStays.push(bookObj)
      } else {
        acc.pastStays.push(bookObj)
      }
      return acc
    }, { pastStays: [], futureStays: [] })
  }
}

export default Customer