import chai from 'chai';
import Database from '../src/classes/Database';
import Booking from '../src/classes/Booking';
import {bookings, customers, rooms} from '../src/data/test-data';
const expect = chai.expect;


describe('Booking', () => {
  let bookArray, roomArray, custArray, database, singleBooking

  beforeEach(() => {
    bookArray = bookings;
    roomArray = rooms;
    custArray = customers;
    database = new Database(bookArray, roomArray, custArray);
    singleBooking = database.bookings[0]
  });
  
  it('should be an instance of a Booking', () => {
    expect(singleBooking).to.be.an.instanceOf(Booking);
  });
  
  it('should have an booking code', () => {
    expect(singleBooking.code).to.equal("5fwrgu4i7k55hl6t6");
  });

  it('should know the customer that booked it', () => {
    expect(singleBooking.userID).to.equal(13);
  });
    
  it('should have a booking date', () => {
    expect(singleBooking.date).to.equal('2022/01/10');
  });

  it('should have a room number', () => {
    expect(singleBooking.roomNumber).to.equal(12);
  });

});