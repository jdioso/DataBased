import axios from "axios";
import buildPath from "./Path";

// function to create an RSO
async function createOrg(requestBody) {
   if (!requestBody) {
      return null;
   }
   const url = buildPath("/api/users/register");
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
      return { message: "Failed to Register User", userID: null };
   });
   // return data if success
   return response.data;
}

// function to edit RSO
async function editOrg(requestBody) {
   if (!requestBody) {
      return null;
   }
   const url = buildPath("/api/users/register");
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
      return { message: "Failed to Register User", userID: null };
   });
   // return data if success
   return response.data;
}

// function to delete RSO
async function deleteOrg(requestBody) {
   if (!requestBody) {
      return null;
   }
   const url = buildPath("/api/users/register");
   let obj = requestBody;

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
      return { message: "Failed to Register User", userID: null };
   });
   // return data if success
   return response.data;
}

// function to search rso's based on name
async function searchOrgs(requestBody) {
   if (!requestBody) {
      return null;
   }
   const url = buildPath("/api/users/register");
   let obj = requestBody;

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
      return { message: "Failed to Register User", userID: null };
   });
   // return data if success
   return response.data;
}

// function to add user to rso
async function addOrgMember(requestBody) {
   if (!requestBody) {
      return null;
   }
   const url = buildPath("/api/users/register");
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
      return { message: "Failed to Register User", userID: null };
   });
   // return data if success
   return response.data;
}

// function to remove user from rso
async function removeOrgMember(requestBody) {
   if (!requestBody) {
      return null;
   }
   const url = buildPath("/api/users/register");
   let obj = requestBody;

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
      return { message: "Failed to Register User", userID: null };
   });
   // return data if success
   return response.data;
}