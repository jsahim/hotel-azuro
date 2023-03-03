class Room {
  constructor(roomObj){
    this.number = roomObj.number
    this.type = roomObj.roomType
    this.bedSize = roomObj.bedSize
    this.numBeds = roomObj.numBeds
    this.hasBidet = roomObj.bidet
    this.costPerNight = roomObj.costPerNight
  }
}

export default Room