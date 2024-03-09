import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCevciw-NbbVMr1LFRk3_3ndDZB3wBu0OM",
  authDomain: "my-blog-page-a7c48.firebaseapp.com",
  projectId: "my-blog-page-a7c48",
  storageBucket: "my-blog-page-a7c48.appspot.com",
  messagingSenderId: "1048419254864",
  appId: "1:1048419254864:web:f7de5d47216e7d22e48755",
  measurementId: "G-YPW3XD8Y7K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
