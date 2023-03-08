function apiRequest(path, request, user, dateSelect, room) {
  return fetch(`http://localhost:3001/api/v1/${path}`, {
      method: request ? request : "GET",
      body: user ? JSON.stringify({ userID: user, date: dateSelect, roomNumber: room }) : null,
      headers: {
          "Content-Type": "application/json"
      }
  })
  .then(response => {
      if(!response.ok) {
          throw new Error(`There was an error. Status Code: ${response.status}`);
      } else {
          return response.json()
      }
  })
  .catch(error => alert(`Could not fetch because: ${error}`));
};

const getAllPromises = () => {
  return Promise.all([
    apiRequest("bookings"), 
    apiRequest("rooms"), 
    apiRequest("customers")]);
};

export default { getAllPromises, apiRequest };

