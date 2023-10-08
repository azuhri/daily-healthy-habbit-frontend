import { current } from "@reduxjs/toolkit";
import {initializeApp} from "@firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";
import '@firebase/auth';
import deviceToken from "@/pages/api/device-token";
import axios from "axios";




const requestPermission = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDM2PRO1U772AH4UUtLw0FYoh3qr7w9BIQ",
    authDomain: "notification-frontend.firebaseapp.com",
    projectId: "notification-frontend",
    storageBucket: "notification-frontend.appspot.com",
    messagingSenderId: "788534901126",
    appId: "1:788534901126:web:d58fe2ae6087f96d125407",
    measurementId: "G-7T71MLSRCX"
  };
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  console.log("REQUESTIONG USER PERMISSION.....");
  Notification.requestPermission().then(permission => {
    if(permission == "granted") {
      console.log("NOTIFICATION USER PERMISSION GRANTED");

      return getToken(messaging, {
        vapidKey: "BMTzDGaXYei4zfuqP1whXxOGXwobOEw0GZpZsrJkQz9k9Nxpqfaro1DMZwmrx8laYM2JwhdfxcxACjQqnzwe-Nc"
      })
      .then( async deviceToken => {
        if(deviceToken) {
                 
          const response = await axios.post(`/api/device-token`, {
            deviceToken,
          });
          console.log("Client token: ", deviceToken);
        } else {
          console.log("Failed to generate app regristation token");
        }
      })
      .catch(error => {
        console.log("Error requesting to receive the token...", error);
      })
    } else {
      console.log("User Permission Denied...");
    }
  })
}

export {requestPermission}