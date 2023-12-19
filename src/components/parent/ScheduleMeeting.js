import React from 'react';

const ScheduleMeeting = () => {
  const styles = `
    @keyframes sway {
      0% {
        transform: rotate(8deg);
      }
      50% {
        transform: rotate(-8deg);
      }
      100% {
        transform: rotate(8deg);
      }
    }

    .container1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      max-width: 100%;
    }

    .object {
      position: absolute;
      animation: sway 2.4s infinite;
      animation-timing-function: ease-in-out;
      transform-origin: top;
      left: 0;
      right: 0;
      height: 5%;
      z-index: 999;
      text-transform: uppercase;
    }

    .object-shape {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: block;
      background-color: #2187C7;
      margin: 0 auto;
      position: relative;
      color: #fff;
      text-align: center;
      padding-top: 25px;
      font-weight: 800;
      box-sizing: border-box;
    }

    .object-shape span {
      font-size: 22px;
      color: white;
    }
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
    .object-rope {
      height: 40vh;
      width: 5px;
      background-color: #2187C7;
      content: "";
      display: block;
      margin-left: 50%;
    }

    .logo {
      max-width: 300px;
    }

    .message {
      margin-top: 40px;
      font-family: sans-serif;
      text-align: center;
    }

    .mailtoaddress {
      font-style: italic;
      margin-top: 20px;
    }
  `;

  return (
    <div className="container1" style={{marginBottom:'60vh'}}>
      <style>{styles}</style>
      <div className="object">
        <div className="object-rope"></div>
        <div className="object-shape">
          Coming <span className="soon">Soon</span>
        </div>
      </div>

      <div className="content">
        <img className="logo" src="https://s3-ap-southeast-2.amazonaws.com/images.fitseeker.com.au/logo.svg" alt="Logo" />

        <h3 className="message">This functionality is temporarily down we are working on it</h3>

        <p className="mailtoaddress"><em>admin @ admin.com.au</em></p>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
