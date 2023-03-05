class Room {
  constructor(roomObj){
    this.number = roomObj.number
    this.type = roomObj.roomType
    this.bedSize = roomObj.bedSize
    this.numBeds = roomObj.numBeds
    this.hasBidet = roomObj.bidet
    this.imagePath = roomObj.roomType
    this.costPerNight = roomObj.costPerNight
  }
  formatType(){
    return this.type.toUpperCase()
  }
  formatBedSize(){
    return this.bedSize.charAt(0).toUpperCase() + this.bedSize.slice(1)
  }
  formatPrice(){
    return this.costPerNight.toFixed(2).toString()
  }
  createImagePath(){
   return `./images/${this.type.replace(" ", "-")}.png`
  }
}

export default Room