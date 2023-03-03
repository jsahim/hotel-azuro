function apiRequest(path) {
  return fetch(`http://localhost:3001/api/v1/${path}`)
  .then(response => {
      if(!response.ok) {
          throw new Error("There was an error. Status Code: ", response.status);
      } else {
          return response.json()
      }
  })
  .catch(error => console.log(`Could not fetch because: ${error}`));
};

const getAllPromises = () => {
  return Promise.all([
    apiRequest("bookings"), 
    apiRequest("rooms"), 
    apiRequest("customers")]);
};

export default { getAllPromises, apiRequest };

