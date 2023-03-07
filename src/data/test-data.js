const bookings = [
  {
    "id": "5fwrgu4i7k55hl6t6",
    "userID": 13,
    "date": "2022/01/10",
    "roomNumber": 12
  },
  {
    "id": "5fwrgu4i7k55hl6t7",
    "userID": 20,
    "date": "2022/02/16",
    "roomNumber": 7
  },
  {
    "id": "5fwrgu4i7k55hl6t8",
    "userID": 1,
    "date": "2022/02/05",
    "roomNumber": 12
  },
  {
    "id": "5fwrgu4i7k55hl6t9",
    "userID": 38,
    "date": "2023/12/14",
    "roomNumber": 14
  },
  {
    "id": "5fwrgu4i7k55hl6ta",
    "userID": 25,
    "date": "2022/01/11",
    "roomNumber": 9
  },
  {
    "id": "5fwrgu4i7k55hl6ys",
    "userID": 8,
    "date": "2023/12/01",
    "roomNumber": 16
  },
  {
    "id": "5fwrgu4i7k55hl6yw",
    "userID": 41 ,
    "date": "2022/01/09",
    "roomNumber": 25
  },
  {
    "id": "5fwrgu4i7k55hl76q",
    "userID": 33,
    "date": "2023/11/19",
    "roomNumber": 17
  },
  {
    "id": "5fwrgu4i7k55hl6v9",
    "userID": 33,
    "date": "2022/02/13",
    "roomNumber": 1
  }
];

const rooms = [
  {
    number: 12,
    roomType: "single room",
    bidet: false,
    bedSize: "twin",
    numBeds: 2,
    costPerNight: 172.09
  },
  {
    number: 20,
    roomType: "residential suite",
    bidet: false,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 343.95
  },
  {
    number: 14,
    roomType: "residential suite",
    bidet: false,
    bedSize: "twin",
    numBeds: 1,
    costPerNight: 457.88
  },
  {
    number: 9,
    roomType: "single room",
    bidet: true,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 200.39
  },
  {
    number: 16,
    roomType: "single room",
    bidet: false,
    bedSize: "full",
    numBeds: 2,
    costPerNight: 328.15
  },
  {
    number: 25,
    roomType: "single room",
    bidet: true,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 305.85
  },
  {
    number: 17,
    roomType: "junior suite",
    bidet: false,
    bedSize: "twin",
    numBeds: 2,
    costPerNight: 328.15
  },
  {
    number: 1,
    roomType: "residential suite",
    bidet: true,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 358.4
  }
];

const customers = [
  {
    "name": "Christina Kulas",
    "id": 13,
  },
  {
    "name": "Keon Kirlin",
    "id": 20,
  },
  {
    "name": "Leatha Ullrich",
    "id": 1,
  },
  {
    "name": "Alessia Rippin",
    "id": 38,
  },
  {
    "name": "Rashawn Langworth",
    "id": 25,
  },
  {
    "name": "Era Hand",
    "id": 8,
  },
  {
    "name": "Francisca Trantow",
    "id": 41,
  },
  {
    "name": "Rae Wisozk",
    "id": 33,
  }
];

export {bookings, customers, rooms}