import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>   //두번 실행되는것 방지  //(https://youngble.tistory.com/175)
    <App />
  // </React.StrictMode>  //두번 실행되는것 방지
);
