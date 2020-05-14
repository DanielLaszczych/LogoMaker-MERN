import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import LogoWorkspace from './LogoWorkspace';
import Button from 'react-bootstrap/Button';

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
    backgroundColor: '#32CD32',
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 5,
    padding: 10,
    margin: 5,
    height: 100,
    width: 400,
    currentText: 0,
    texts: [
      {
        id: 1,
        text: 'GoLogoLo Logod',
        color: '#FF0000',
        fontSize: 25,
        x: 0,
        y: 0,
        zIndex: 0,
      },
    ],
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
                  Create Logo
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
                  {this.state.texts.length > 0 ? (
                    <React.Fragment>
                      <div className='form-group'>
                        <label
                          htmlFor='text'
                          style={{
                            color: 'white',
                          }}
                        >
                          Text: #{this.state.texts[this.state.currentText].id}
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='text'
                          placeholder='Text'
                          onChange={(event) => {
                            if (
                              event.target.value !== '' &&
                              /\S/.test(event.target.value)
                            ) {
                              const newTexts = [...this.state.texts];
                              const index = newTexts.indexOf(
                                this.state.texts[this.state.currentText]
                              );
                              newTexts[index] = {
                                ...this.state.texts[this.state.currentText],
                              };
                              newTexts[index].text = event.target.value;
                              this.setState({ texts: newTexts });
                            } else {
                              event.preventDefault();
                            }
                          }}
                          value={this.state.texts[this.state.currentText].text}
                        />
                      </div>
                      <div className='form-group'>
                        <label
                          htmlFor='text'
                          style={{
                            color: 'white',
                          }}
                        >
                          Priority:{' '}
                          {this.state.texts[this.state.currentText].zIndex}
                        </label>
                        <div style={{ textAlign: 'center' }}>
                          <Button
                            onClick={() => {
                              if (
                                this.state.texts[this.state.currentText]
                                  .zIndex > 0
                              ) {
                                const newTexts = [...this.state.texts];
                                const index = newTexts.indexOf(
                                  this.state.texts[this.state.currentText]
                                );
                                newTexts[index] = {
                                  ...this.state.texts[this.state.currentText],
                                };
                                newTexts[index].zIndex =
                                  this.state.texts[this.state.currentText]
                                    .zIndex - 1;
                                this.setState({ texts: newTexts });
                              }
                            }}
                            variant={
                              this.state.texts[this.state.currentText]
                                .zIndex === 0
                                ? 'outline-success'
                                : 'success'
                            }
                            style={{ width: '30%', marginRight: '10px' }}
                          >
                            Down
                          </Button>
                          <Button
                            onClick={() => {
                              const newTexts = [...this.state.texts];
                              const index = newTexts.indexOf(
                                this.state.texts[this.state.currentText]
                              );
                              newTexts[index] = {
                                ...this.state.texts[this.state.currentText],
                              };
                              newTexts[index].zIndex =
                                this.state.texts[this.state.currentText]
                                  .zIndex + 1;
                              this.setState({ texts: newTexts });
                            }}
                            variant='success'
                            style={{ width: '30%', marginLeft: '10px' }}
                          >
                            Up
                          </Button>
                        </div>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='fontSize' style={{ color: 'white' }}>
                          Font Size:{' '}
                          {this.state.texts[this.state.currentText].fontSize}
                        </label>
                        <input
                          type='range'
                          className='custom-range'
                          name='fontSize'
                          min='1'
                          max='100'
                          style={{
                            border: 'transparent',
                            backgroundColor: 'transparent',
                          }}
                          step='1'
                          value={
                            this.state.texts[this.state.currentText].fontSize
                          }
                          id='fontSizeSlider'
                          onChange={(event) => {
                            const newTexts = [...this.state.texts];
                            const index = newTexts.indexOf(
                              this.state.texts[this.state.currentText]
                            );
                            newTexts[index] = {
                              ...this.state.texts[this.state.currentText],
                            };
                            newTexts[index].fontSize = event.target.value;
                            this.setState({ texts: newTexts });
                          }}
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
                          placeholder='Color'
                          onChange={(event) => {
                            const newTexts = [...this.state.texts];
                            const index = newTexts.indexOf(
                              this.state.texts[this.state.currentText]
                            );
                            newTexts[index] = {
                              ...this.state.texts[this.state.currentText],
                            };
                            newTexts[index].color = event.target.value;
                            this.setState({ texts: newTexts });
                          }}
                          value={this.state.texts[this.state.currentText].color}
                        />
                      </div>
                      <div
                        className='form-group'
                        style={{ textAlign: 'center' }}
                      >
                        <Button
                          variant='danger'
                          onClick={() => {
                            const newTexts = [...this.state.texts];
                            newTexts.splice(this.state.currentText, 1);
                            for (
                              let i = this.state.currentText;
                              i < newTexts.length;
                              i++
                            ) {
                              newTexts[i].id = newTexts[i].id - 1;
                            }
                            let newCurrentText = 0;
                            if (this.state.texts.length === 1) {
                              newCurrentText = 0;
                            } else if (
                              this.state.texts.length > 1 &&
                              this.state.currentText === 0
                            ) {
                              newCurrentText = 0;
                            } else {
                              newCurrentText = this.state.currentText - 1;
                            }
                            this.setState({
                              texts: newTexts,
                              currentText: newCurrentText,
                            });
                          }}
                        >
                          Remove text
                        </Button>
                      </div>
                    </React.Fragment>
                  ) : null}
                  <div className='form-group' style={{ textAlign: 'center' }}>
                    <Button
                      onClick={() => {
                        if (this.state.currentText > 0)
                          this.setState({
                            currentText: this.state.currentText - 1,
                          });
                      }}
                      variant={
                        this.state.currentText > 0 ? 'danger' : 'outline-danger'
                      }
                      style={{ textAlign: 'center' }}
                    >
                      {'<'}
                    </Button>
                    <Button
                      style={{ marginLeft: '25px', marginRight: '25px' }}
                      variant='success'
                      onClick={() => {
                        let newText = {
                          id:
                            this.state.texts.length === 0
                              ? 1
                              : this.state.texts[this.state.texts.length - 1]
                                  .id + 1,
                          text: 'GoLogoLo Logod',
                          color: '#FF0000',
                          fontSize: 25,
                          x: 0,
                          y: 0,
                          zIndex: 0,
                        };
                        let newTexts = [...this.state.texts];
                        newTexts.push(newText);
                        this.setState({
                          texts: newTexts,
                          currentText: this.state.currentText + 1,
                        });
                      }}
                    >
                      Add text
                    </Button>
                    <Button
                      onClick={() => {
                        if (
                          this.state.texts.length > 1 &&
                          this.state.currentText !== this.state.texts.length - 1
                        )
                          this.setState({
                            currentText: this.state.currentText + 1,
                          });
                      }}
                      variant={
                        this.state.texts.length > 1 &&
                        this.state.currentText !== this.state.texts.length - 1
                          ? 'danger'
                          : 'outline-danger'
                      }
                      style={{ textAlign: 'center' }}
                    >
                      {'>'}
                    </Button>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='fontSize' style={{ color: 'white' }}>
                      Logo Dimensions
                    </label>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='fontSize' style={{ color: 'white' }}>
                      Height: {this.state.height} px
                    </label>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='fontSize' style={{ color: 'white' }}>
                      Width: {this.state.width} px
                    </label>
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
              texts={this.state.texts}
              color={this.state.color}
              backgroundColor={this.state.backgroundColor}
              borderColor={this.state.borderColor}
              borderRadius={this.state.borderRadius}
              borderWidth={this.state.borderWidth}
              padding={this.state.padding}
              margin={this.state.margin}
              height={this.state.height}
              width={this.state.width}
              onResize={(event, { element, size, handle }) => {
                const oldHeight = this.state.height;
                const oldWidth = this.state.width;
                this.setState({ width: size.width });
                this.setState({ height: size.height });
                this.setState({ bounds: 'parent' });
                const newTexts = [...this.state.texts];
                newTexts.forEach((text) => {
                  const adjustX = oldWidth - size.width;
                  const adjustY = oldHeight - size.height;
                  if (text.x !== 0 && text.x > 0) {
                    text.x -= adjustX;
                  } else {
                    text.x = 0;
                  }
                  if (text.y !== 0 && text.y > 0) {
                    text.y -= adjustY;
                  } else {
                    text.y = 0;
                  }
                });
              }}
              onDrag={(event, position, text) => {
                const newTexts = [...this.state.texts];
                const index = newTexts.indexOf(text);
                newTexts[index] = { ...text };
                newTexts[index].x = position.x;
                newTexts[index].y = position.y;
                this.setState({ texts: newTexts });
              }}
              rePosition={(newTexts) => {
                this.setState({ texts: newTexts });
              }}
            ></LogoWorkspace>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateLogoScreen;
