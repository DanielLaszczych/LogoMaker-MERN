import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import LogoWorkspace from './LogoWorkspace';

const ADD_LOGO = gql`
  mutation AddLogo(
    $text: String!
    $color: String!
    $fontSize: Int!
    $backgroundColor: String!
    $borderColor: String!
    $borderRadius: Int!
    $borderWidth: Int!
    $padding: Int!
    $margin: Int!
  ) {
    addLogo(
      text: $text
      color: $color
      fontSize: $fontSize
      backgroundColor: $backgroundColor
      borderColor: $borderColor
      borderRadius: $borderRadius
      borderWidth: $borderWidth
      padding: $padding
      margin: $margin
    ) {
      _id
    }
  }
`;

class CreateLogoScreen extends Component {
  state = {
    text: 'GoLogoLo Logo',
    color: '#FF0000',
    fontSize: 25,
    backgroundColor: '#32CD32',
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 5,
    padding: 10,
    margin: 5,
  };

  render() {
    let text,
      color,
      fontSize,
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      padding,
      margin;
    return (
      <Mutation
        mutation={ADD_LOGO}
        onCompleted={() => this.props.history.push('/')}
      >
        {(addLogo, { loading, error }) => (
          <div className='container'>
            <div
              className='navbar'
              style={{
                backgroundColor: '#546e7a',
                padding: '5px 0px 5px 0px',
                marginTop: '25px',
                borderRadius: '10px',
              }}
            >
              <div
                style={{
                  cursor: 'pointer',
                  fontSize: '180%',
                  color: 'white',
                }}
                onClick={() => this.props.history.push('/')}
              >
                Home
              </div>
            </div>
            <div
              className='panel panel-default'
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                padding: '15px 25px 15px 25px',
                marginTop: '25px',
              }}
            >
              <div
                className='panel-body'
                style={{
                  backgroundColor: '#546e7a',
                  padding: '25px',
                  borderRadius: '10px',
                }}
              >
                <h3
                  style={{
                    color: 'white',
                    textDecoration: 'underline',
                    marginBottom: '15px',
                  }}
                >
                  View Logo
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addLogo({
                      variables: {
                        text: text.value,
                        color: color.value,
                        fontSize: parseInt(fontSize.value),
                        backgroundColor: backgroundColor.value,
                        borderColor: borderColor.value,
                        borderRadius: parseInt(borderRadius.value),
                        borderWidth: parseInt(borderWidth.value),
                        padding: parseInt(padding.value),
                        margin: parseInt(margin.value),
                      },
                    });
                    text.value = '';
                    color.value = '';
                    fontSize.value = '';
                    backgroundColor.value = '';
                    borderColor.value = '';
                    borderRadius.value = '';
                    borderWidth.value = '';
                    padding.value = '';
                    margin.value = '';
                  }}
                >
                  <div className='form-group'>
                    <label htmlFor='text' style={{ color: 'white' }}>
                      Text:
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      name='text'
                      ref={(node) => {
                        text = node;
                      }}
                      placeholder='Text'
                      onChange={(event) =>
                        this.setState({ text: event.target.value })
                      }
                      style={{ display: 'inline-block' }}
                      value={this.state.text}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='color' style={{ color: 'white' }}>
                      Color:
                    </label>
                    <input
                      type='color'
                      className='form-control'
                      name='color'
                      ref={(node) => {
                        color = node;
                      }}
                      placeholder='Color'
                      onChange={(event) =>
                        this.setState({ color: event.target.value })
                      }
                      value={this.state.color}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='fontSize' style={{ color: 'white' }}>
                      Font Size: {this.state.fontSize}
                    </label>
                    <input
                      type='range'
                      className='custom-range'
                      name='fontSize'
                      ref={(node) => {
                        fontSize = node;
                      }}
                      min='1'
                      max='100'
                      style={{
                        border: 'transparent',
                        backgroundColor: 'transparent',
                      }}
                      step='1'
                      value={this.state.fontSize}
                      id='fontSizeSlider'
                      onChange={(event) =>
                        this.setState({ fontSize: event.target.value })
                      }
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='color' style={{ color: 'white' }}>
                      Background Color:
                    </label>
                    <input
                      type='color'
                      className='form-control'
                      name='backgroundColor'
                      ref={(node) => {
                        backgroundColor = node;
                      }}
                      placeholder='Background Color'
                      onChange={(event) =>
                        this.setState({ backgroundColor: event.target.value })
                      }
                      value={this.state.backgroundColor}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='color' style={{ color: 'white' }}>
                      Border Color:
                    </label>
                    <input
                      type='color'
                      className='form-control'
                      name='borderColor'
                      ref={(node) => {
                        borderColor = node;
                      }}
                      placeholder='Border Color'
                      onChange={(event) =>
                        this.setState({ borderColor: event.target.value })
                      }
                      value={this.state.borderColor}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='fontSize' style={{ color: 'white' }}>
                      Border Radius: {this.state.borderRadius}
                    </label>
                    <input
                      type='range'
                      className='custom-range'
                      name='borderRadius'
                      ref={(node) => {
                        borderRadius = node;
                      }}
                      min='0'
                      max='25'
                      step='1'
                      value={this.state.borderRadius}
                      onChange={(event) =>
                        this.setState({ borderRadius: event.target.value })
                      }
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='fontSize' style={{ color: 'white' }}>
                      Border Width: {this.state.borderWidth}
                    </label>
                    <input
                      type='range'
                      className='custom-range'
                      name='borderWidth'
                      ref={(node) => {
                        borderWidth = node;
                      }}
                      min='0'
                      max='25'
                      step='1'
                      value={this.state.borderWidth}
                      onChange={(event) =>
                        this.setState({ borderWidth: event.target.value })
                      }
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='fontSize' style={{ color: 'white' }}>
                      Padding: {this.state.padding}
                    </label>
                    <input
                      type='range'
                      className='custom-range'
                      name='padding'
                      ref={(node) => {
                        padding = node;
                      }}
                      min='0'
                      max='25'
                      step='1'
                      value={this.state.padding}
                      onChange={(event) =>
                        this.setState({ padding: event.target.value })
                      }
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='fontSize' style={{ color: 'white' }}>
                      Margin: {this.state.margin}
                    </label>
                    <input
                      type='range'
                      className='custom-range'
                      name='margin'
                      ref={(node) => {
                        margin = node;
                      }}
                      min='0'
                      max='25'
                      step='1'
                      value={this.state.margin}
                      onChange={(event) =>
                        this.setState({ margin: event.target.value })
                      }
                    />
                  </div>
                  <button type='submit' className='btn btn-success'>
                    Submit
                  </button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
              </div>
            </div>
            <LogoWorkspace
              text={this.state.text}
              color={this.state.color}
              fontSize={this.state.fontSize}
              backgroundColor={this.state.backgroundColor}
              borderColor={this.state.borderColor}
              borderRadius={this.state.borderRadius}
              borderWidth={this.state.borderWidth}
              padding={this.state.padding}
              margin={this.state.margin}
            ></LogoWorkspace>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateLogoScreen;
