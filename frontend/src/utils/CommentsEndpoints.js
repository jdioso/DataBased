import axios from "axios";
import buildPath from "./Path";

// function to add comment
// if query is successful, returns object with success message and new comment's id
async function addComment(requestBody) {
   if (!requestBody) {
      return {
         message: "Insufficient information to add comment.",
         commentID: null,
      };
   }
   const url = buildPath("/api/comments/add");
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
      return { message: "Failed to post comment.", commentID: null };
   });
   // return data if success
   return response.data;
}

// function to edit comment
// if query is successful, returns object with success message and edited comment's id
async function editComment(commentID = null, requestBody) {
   if (commentID === null || !requestBody) {
      return {
         message: "Insufficient information to edit comment.",
         commentID: null,
      };
   }
   const url = buildPath(`/api/comments/edit/${commentID}`);
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
      return { message: "Failed to edit comment.", commentID: null };
   });
   // return data if success
   return response.data;
}

// function to delete comment
// if query is successful, returns object with success message and deleted comment's id
async function deleteComment(commentID = null) {
   if (commentID === null) {
      return {
         message: "Insufficient information to delete comment.",
         commentID: null,
      };
   }
   const url = buildPath(`/api/comments/delete/${commentID}`);

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
      return { message: "Failed to delete comment.", commentID: null };
   });
   // return data if success
   return response.data;
}

// function to get all comments under an event
async function getEventComments(eventID = null) {
   if (eventID === null) {
      return {
         message: "Insufficient inforamtion to get event's comments.",
         eventID: null,
      };
   }

   const url = buildPath(`/api/comments/search/${eventID}`);

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
      return { message: "Failed to get event commments", eventID: eventID };
   });
   // return data if success
   return response.data;
}

export { addComment, editComment, deleteComment, getEventComments };
