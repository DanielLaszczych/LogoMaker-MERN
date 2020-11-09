import React, { Component } from 'react';
import googleSignIn from './btn_google_signin_dark_normal_web.png';
import googleSignInTouch from './btn_google_signin_dark_pressed_web.png';

class Login extends Component {
  state = {
    pressed: false,
  };

  render() {
    return (
      <div
        style={{
          margin: '0 auto',
          marginTop: '100px',
          textAlign: 'center',
          width: '30%',
          height: 'max-content',
          backgroundColor: '#E6E6E6',
          padding: '25px',
          borderRadius: '15px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            backgroundImage: 'linear-gradient(to bottom, #2177F3, #6194DD)',
            color: 'white',
            fontSize: '48pt',
            borderColor: 'black',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '10px',
            padding: '25px',
            marginBottom: '15px',
          }}
        >
          GoLogoLo
        </div>
        <a href='http://localhost:3000/google'>
          <img
            alt='Logo'
            src={this.state.pressed ? googleSignInTouch : googleSignIn}
            style={{}}
            onMouseEnter={() => this.setState({ pressed: true })}
            onMouseLeave={() => this.setState({ pressed: false })}
          ></img>
        </a>
      </div>
    );
  }
}

export default Login;
