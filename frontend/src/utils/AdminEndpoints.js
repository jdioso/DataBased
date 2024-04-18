import axios from "axios";
import buildPath from "./Path";

async function addAdmin(requestBody) {
   if (!requestBody) {
      return null;
   }
   const url = buildPath("/api/admin/registerAdmin");
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

async function addSuperAdmin(requestBody) {
    if (!requestBody) {
       return null;
    }
    const url = buildPath("/api/admin/registerSA");
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


 async function getAdmin(id = null, requestBody) {
    if (id == null || !requestBody) {
       return null;
    }
    const url = buildPath(`/api/admin/${id}`);
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


 async function getSuperAdmin(id = null, requestBody) {
    if (id == null || !requestBody) {
       return null;
    }
    const url = buildPath(`/api/admin/super_admin/${id}`);
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

export { addAdmin, addSuperAdmin, getAdmin, getSuperAdmin};

