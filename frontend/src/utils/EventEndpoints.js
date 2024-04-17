import axios from "axios";
import buildPath from "./Path";

// function to add event
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

      // return something if there was an error
      return {
         message: "Failed to add event",
         eventID: null,
      };
   });
   // return data if success
   return response.data;
}

// function to edit event
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

      // return something if there was an error
      return { message: "Failed to edit event.", eventID: null };
   });
   // return data if success
   return response.data;
}

// function to delete event
async function deleteEvent(eventID = null) {
   if (eventID === null) {
      return {
         message: "Insufficient information to delete event.",
         commentID: null,
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

      // return something if there was an error
      return { message: "Failed to delete event", eventID: null };
   });
   // return data if success
   return response.data;
}

// function to get all events
async function getAllEvents(eventID = null) {
   if ((eventID = null)) {
      return {
         message: "Insufficient Information to get all events.",
         eventID: eventID,
      };
   }
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

      // return something if there was an error
      return { message: "Failed to get all events.", eventID: eventID };
   });
   // return data if success
   return response.data;
}

// function that calls api to search for events by rso
async function getEventsByOrg(orgID) {
   if ((orgID = null)) {
      return {
         message: "Insufficient Information to get events by rso.",
         orgID: orgID,
      };
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

      // return something if there was an error
      return { message: "Failed to get events by rso", eventID: null };
   });
   // return data if success
   return response.data;
}

// function that calls api to search for events by university
// takes additional privacy category to filter events by privacy
async function getEventsByUniversity(universityID, privacy = null) {
   if ((universityID = null)) {
      return {
         message: "Insufficient Information to get events by rso.",
         universityID: null,
      };
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

      // return something if there was an error
      return { message: "Failed to get events university", universityID: null };
   });
   // return data if success
   return response.data;
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
