import axios from "axios";
import buildPath from "./Path";

// function that calls register endpoint
async function login(requestBody) {
   if (!requestBody) {
      return null;
   }
   const url = buildPath("/api/users/login");
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
      return null;
   } else {
      // return data if success
      return response.data;
   }
}

// function that calls login endpoint
async function register(requestBody) {
   if (!requestBody) {
      return null;
   }
   const url = buildPath("/api/users/register");
   let obj = requestBody;

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
      return null;
   } else {
      // return data if success
      return response.data;
   }
}

// function that calls login endpoint
async function getByID(requestBody) {
   if (id == null || !requestBody) {
      return null;
   }

   const url = buildPath(`/api/users/user/${id}`);
   let obj = requestBody;

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
      return null;
   } else {
      // return data if success
      return response.data;
   }
}

export { login, register, getByID};
