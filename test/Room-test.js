import chai from 'chai';
import Database from '../src/classes/Database';
import Room from '../src/classes/Room';
import {bookings, customers, rooms} from '../src/data/test-data';
const expect = chai.expect;


describe('Booking', () => {
  let bookArray, roomArray, custArray, database, singleRoom

  beforeEach(() => {
    bookArray = bookings;
    roomArray = rooms;
    custArray = customers;
    database = new Database(bookArray, roomArray, custArray);
    singleRoom = database.rooms[0]
  });
  
  it('should be an instance of a Room', () => {
    expect(singleRoom).to.be.an.instanceOf(Room);
  });
  
  it('should have a room number', () => {
    expect(singleRoom.number).to.equal(12);
  });

  it('should have room type', () => {
    expect(singleRoom.type).to.equal('single room');
  });
    
  it('should have a certain bed size', () => {
    expect(singleRoom.bedSize).to.equal('twin');
  });

  it('should have a certain number of beds', () => {
    expect(singleRoom.numBeds).to.equal(2);
  });

  it('should have a bidet or not', () => {
    expect(singleRoom.hasBidet).to.equal(false);
  });

  it('should have a cost per night', () => {
    expect(singleRoom.costPerNight).to.equal(172.09);
  });

});