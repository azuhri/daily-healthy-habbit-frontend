importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDM2PRO1U772AH4UUtLw0FYoh3qr7w9BIQ",
  authDomain: "notification-frontend.firebaseapp.com",
  projectId: "notification-frontend",
  storageBucket: "notification-frontend.appspot.com",
  messagingSenderId: "788534901126",
  appId: "1:788534901126:web:d58fe2ae6087f96d125407",
  measurementId: "G-7T71MLSRCX"
});

const messaging = firebase.messaging();