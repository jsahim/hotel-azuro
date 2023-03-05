class Customer {
  constructor(userObj){
    this.id = userObj.id
    this.name = userObj.name
    this.username = `customer${this.id}`
    this.password = "overlook2021"
    this.totalSpent = 0
  }
  getFirstName(){
    return this.name.split(" ")[0]
  }
  // getTotalSpent(){
  //   this.totalSpent 
  // }
  // getPointsEarned(){
    
  // }
}

export default Customer