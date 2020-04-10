import React, { Component } from 'react';

class LogoWorkspace extends Component {
  render() {
    return (
      <div
        style={{
          display: 'inline-block',
          verticalAlign: 'top',
          position: 'absolute',
          marginTop: '120px',
          marginLeft: '150px',
        }}
      >
        <div
          style={{
            color: this.props.color,
            fontSize: this.props.fontSize + 'px',
            backgroundColor: this.props.backgroundColor,
            borderColor: this.props.borderColor,
            borderStyle: 'solid',
            borderRadius: this.props.borderRadius + 'px',
            borderWidth: this.props.borderWidth + 'px',
            padding: this.props.padding + 'px',
            margin: this.props.margin + 'px',
          }}
        >
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default LogoWorkspace;
