import chai from 'chai';
import Customer from '../src/classes/Customer';
import Database from '../src/classes/Database';
import {bookings, customers, rooms} from '../src/data/test-data';
const expect = chai.expect;


describe('Customer', () => {
  let bookArray, roomArray, custArray, database, oneCustomer, twoCustomer

  beforeEach(() => {
    bookArray = bookings;
    roomArray = rooms;
    custArray = customers;
    database = new Database(bookArray, roomArray, custArray)
    oneCustomer = database.customers[0]
    twoCustomer = database.customers[7]

  });
  
  it('should be an instance of a Customer', () => {
    expect(oneCustomer).to.be.an.instanceOf(Customer);
  });
  
  it('should have an id', () => {
    expect(oneCustomer.id).to.equal(13);
  });
    
  it('should have a name', () => {
    expect(oneCustomer.name).to.equal('Christina Kulas');
  });

  it('should have a username', () => {
    expect(oneCustomer.username).to.equal('customer13');
  });

  it('should have a password', () => {
    expect(oneCustomer.password).to.equal('overlook2021');
  });

  it('should have a place to store all bookings', () => {
    twoCustomer.allBookings = database.bookings.filter(booking => booking.userID === twoCustomer.id)
    expect(twoCustomer.allBookings).to.be.an('array');
    expect(twoCustomer.allBookings.length).to.equal(2);
  });

  it('should know how much money they/ve spent on rooms', () => {
    twoCustomer.allBookings = database.bookings.filter(booking => booking.userID === twoCustomer.id)
    let total = twoCustomer.getTotalSpent(database.rooms)
    console.log(total);
    expect(total).to.equal('686.55');
  });

  it('should be able to identify just their first name', () => {
    let firstName = twoCustomer.getFirstName()
    expect(firstName).to.equal('Rae');
  });

  it('should be able to caluclate points earned', () => {
    twoCustomer.allBookings = database.bookings.filter(booking => booking.userID === twoCustomer.id)
    twoCustomer.getTotalSpent(database.rooms)
    let pointsEarned = twoCustomer.getPointsEarned()
    expect(pointsEarned).to.equal(1374);
  });

  it('should be able to know their member level', () => {
    twoCustomer.allBookings = database.bookings.filter(booking => booking.userID === twoCustomer.id)
    twoCustomer.getTotalSpent(database.rooms)
    let memberLevel = twoCustomer.getMemberLevel()
    expect(memberLevel).to.equal('Silver Member');
  });

  it('should be able to sort their stored bookings', () => {
    twoCustomer.allBookings = database.bookings.filter(booking => booking.userID === twoCustomer.id)
    let sortedBookings = twoCustomer.sortBookings()
    expect(sortedBookings).to.be.an('object');
    expect(sortedBookings.pastStays).to.be.an('array');
    expect(sortedBookings.pastStays[0].date).to.equal('2022/02/13');
    expect(sortedBookings.futureStays).to.be.an('array');
    expect(sortedBookings.futureStays[0].date).to.equal('2023/11/19');
  });

});