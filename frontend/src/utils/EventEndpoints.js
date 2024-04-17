import axios from "axios";
import buildPath from "./Path";

// function to add event
// if query is successful, returns object with success message and new event's id
async function addEvent(requestBody) {
   if (!requestBody) {
      return {
         message: "Insufficnent Information to add event.",
         eventID: null,
      };
   }
   const url = buildPath("api/events/add");
   let obj = requestBody;

   // settings for request
   let config = {
      method: "post",
      url: url,
      headers: {
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
               "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json",
         },
      },
      data: obj,
   };

   // handles calling request
   const response = await axios.request(config).catch((error) => {
      // handles different error cases
      if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
      } else if (error.request) {
         // The request was made but no response was received
         // `error.request` is an instance of XMLHttpRequest in the browser
         // and an instance of http.ClientRequest in node.js
         console.log(error.request);
      } else {
         // Something happened in setting up the request that triggered an Error
         console.log("Error", error.message);
      }
   });

   // return for failed request
   if (!response) {
      return {
         message: "Failed to add event",
         eventID: null,
      };
   } else {
      // return data if success
      return response.data;
   }
}

// function to edit event
// if query is successful, returns object with success message and edited event's id
async function editEvent(eventID, requestBody) {
   if (eventID != null || !requestBody) {
      return {
         message: "Insufficient information to edit comment.",
         eventID: null,
      };
   }
   const url = buildPath(`/api/events/edit/${eventID}`);
   let obj = requestBody;

   // settings for request
   let config = {
      method: "put",
      url: url,
      headers: {
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
               "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json",
         },
      },
      data: obj,
   };

   // handles calling request
   const response = await axios.request(config).catch((error) => {
      // handles different error cases
      if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
      } else if (error.request) {
         // The request was made but no response was received
         // `error.request` is an instance of XMLHttpRequest in the browser
         // and an instance of http.ClientRequest in node.js
         console.log(error.request);
      } else {
         // Something happened in setting up the request that triggered an Error
         console.log("Error", error.message);
      }
   });
   // return for failed request
   if (!response) {
      return { message: "Failed to edit event.", eventID: null };
   } else {
      // return data if success
      return response.data;
   }
}

// function to delete event
// if query is successful, returns object with success message and deleted event's id
async function deleteEvent(eventID = null) {
   if (eventID === null) {
      return {
         message: "Insufficient information to delete event.",
         eventID: null,
      };
   }
   const url = buildPath(`/api/events/delete/${eventID}`);

   // settings for request
   let config = {
      method: "delete",
      url: url,
      headers: {
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
               "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json",
         },
      },
   };

   // handles calling request
   const response = await axios.request(config).catch((error) => {
      // handles different error cases
      if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
      } else if (error.request) {
         // The request was made but no response was received
         // `error.request` is an instance of XMLHttpRequest in the browser
         // and an instance of http.ClientRequest in node.js
         console.log(error.request);
      } else {
         // Something happened in setting up the request that triggered an Error
         console.log("Error", error.message);
      }
   });

   // return for failed request
   if (!response) {
      return { message: "Failed to delete event", eventID: null };
   } else {
      // return data if success
      return response.data;
   }
}

// function to get all events
// if query is successful, returns list of all events
async function getAllEvents() {
   const url = buildPath(`/api/events/searchAll`);

   // settings for request
   let config = {
      method: "get",
      url: url,
      headers: {
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
               "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json",
         },
      },
   };

   // handles calling request
   const response = await axios.request(config).catch((error) => {
      // handles different error cases
      if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
      } else if (error.request) {
         // The request was made but no response was received
         // `error.request` is an instance of XMLHttpRequest in the browser
         // and an instance of http.ClientRequest in node.js
         console.log(error.request);
      } else {
         // Something happened in setting up the request that triggered an Error
         console.log("Error", error.message);
      }
   });
   // return for failed request
   if (!response) {
      return null;
   } else {
      // return data if success
      return response.data;
   }
}

// function that calls api to search for events by rso
// if query is successful, returns list of all events from rso associated with 'orgID'
async function getEventsByOrg(orgID) {
   if ((orgID = null)) {
      return null;
   }
   const url = buildPath(`/api/events/SearchRSOEvents/${orgID}`);

   // settings for request
   let config = {
      method: "get",
      url: url,
      headers: {
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
               "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json",
         },
      },
   };

   // handles calling request
   const response = await axios.request(config).catch((error) => {
      // handles different error cases
      if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
      } else if (error.request) {
         // The request was made but no response was received
         // `error.request` is an instance of XMLHttpRequest in the browser
         // and an instance of http.ClientRequest in node.js
         console.log(error.request);
      } else {
         // Something happened in setting up the request that triggered an Error
         console.log("Error", error.message);
      }
   });

   // return for failed request
   if (!response) {
      return null;
   } else {
      // return data if success
      return response.data;
   }
}

// function that calls api to search for events by university
// takes additional privacy category to filter events by privacy
// if query is successful, returns list of all events from rso associated with inputed university
async function getEventsByUniversity(universityID = null, privacy = null) {
   if (universityID === null) {
      return null;
   }

   let url = buildPath(`/api/events/universityEvents/${universityID}`);
   if (privacy) {
      url = buildPath(
         `/api/events/universityEvents/${universityID}/${privacy}`
      );
   }

   // settings for request
   let config = {
      method: "get",
      url: url,
      headers: {
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
               "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json",
         },
      },
   };

   // handles calling request
   const response = await axios.request(config).catch((error) => {
      // handles different error cases
      if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
      } else if (error.request) {
         // The request was made but no response was received
         // `error.request` is an instance of XMLHttpRequest in the browser
         // and an instance of http.ClientRequest in node.js
         console.log(error.request);
      } else {
         // Something happened in setting up the request that triggered an Error
         console.log("Error", error.message);
      }
   });

   // return for failed request
   if (!response) {
      return null;
   } else {
      // return data if success
      return response.data;
   }
}

// function that calls api to search event by event type
function getEventsByType(eventType) {}

export {
   addEvent,
   editEvent,
   deleteEvent,
   getAllEvents,
   getEventsByOrg,
   getEventsByUniversity,
};
