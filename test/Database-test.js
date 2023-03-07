import chai from 'chai';
import Database from '../src/classes/Database';
import {bookings, customers, rooms} from '../src/data/test-data';
const expect = chai.expect;

describe('Hotel Database', () => {
  let bookArray, roomArray, custArray, database;
  beforeEach(() => {
    bookArray = bookings;
    roomArray = rooms;
    custArray = customers;
  });

  it('Should be an instance', () => {
    database = new Database(bookArray, roomArray, custArray);
    console.log(database)
    expect(database).to.be.an.instanceOf(Database);
  });

  it('Should be able to store bookings', () => {
    database = new Database(bookArray, roomArray, custArray);
    expect(database.bookings).to.be.an('array');
    expect(database.bookings[0]).to.be.an('object');
    expect(database.bookings[0].code).to.equal('5fwrgu4i7k55hl6t6');
  });
  
  it('Should be able to store rooms', () => {
    database = new Database(bookArray, roomArray, custArray);
    expect(database.rooms).to.be.an.an('array');
    expect(database.rooms[0]).to.be.an('object');
    expect(database.rooms[0].type).to.equal('single room');
  });

  it('Should be able to store customers', () => {
    database = new Database(bookArray, roomArray, custArray);
    expect(database.customers).to.be.an.an('array');
    expect(database.customers[0]).to.be.an('object');
    expect(database.customers[0].name).to.equal('Christina Kulas');
  });
  
  it('Should be able to filter rooms by date', () => {
    let dateMatch
    database = new Database(bookArray, roomArray, custArray);
    expect(database.availRooms).to.equal(null);

    dateMatch = database.filterRoomDate('2022/01/15')
    expect(dateMatch.length).to.be.equal(8);

    dateMatch = database.filterRoomDate('2022/01/10')
    expect(dateMatch.length).to.be.equal(7);
    expect(database.availRooms).to.be.an('array');
  });

  it('Should be able to filter rooms by date and type', () => {
    let typeMatch
    database = new Database(bookArray, roomArray, custArray);
    database.filterRoomDate('2022/01/15')

    typeMatch = database.filterRoomType("all rooms")
    expect(typeMatch.length).to.equal(8);
    expect(typeMatch[0].type).to.equal('single room');
    expect(typeMatch[1].type).to.equal('residential suite');

    typeMatch = database.filterRoomType("single room")
    expect(typeMatch.length).to.equal(4);
    expect(typeMatch[0].type).to.equal('single room');
    expect(typeMatch[1].type).to.equal('single room');
  });

  it('Should be able to format dates for nice presentation', () => {
    let formatDate
    database = new Database(bookArray, roomArray, custArray);
    formatDate = database.getDateDetails('2022/01/15')
    expect(formatDate).to.equal("JAN 15, 2022");
  });

  it('Should be able to format room types for display', () => {
    let formatType
    database = new Database(bookArray, roomArray, custArray);
    formatType = database.getRoomDetails(16)
    expect(formatType).to.equal("SINGLE ROOM ┃ 2-FULL BEDS");
  });
});
