import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import LogoWorkspace from './LogoWorkspace';

const GET_LOGO = gql`
  query logo($logoId: String) {
    logo(id: $logoId) {
      _id
      text
      color
      fontSize
      backgroundColor
      borderColor
      borderRadius
      borderWidth
      padding
      margin
      lastUpdate
    }
  }
`;

const UPDATE_LOGO = gql`
  mutation updateLogo(
    $id: String!
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
    updateLogo(
      id: $id
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
      lastUpdate
    }
  }
`;

class EditLogoScreen extends Component {
  state = {
    text: false,
    color: false,
    fontSize: false,
    backgroundColor: false,
    borderColor: false,
    borderRadius: false,
    borderWidth: false,
    padding: false,
    margin: false,
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
      <Query
        query={GET_LOGO}
        variables={{ logoId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <Mutation
              mutation={UPDATE_LOGO}
              key={data.logo._id}
              onCompleted={() => this.props.history.push(`/`)}
            >
              {(updateLogo, { loading, error }) => (
                <div className='container'>
                  <div
                    className='panel panel-default'
                    style={{ display: 'inline-block' }}
                  >
                    <div className='panel-heading'>
                      <h4>
                        <Link to='/'>Home</Link>
                      </h4>
                      <h3 className='panel-title'>Edit Logo</h3>
                    </div>
                    <div
                      className='panel-body'
                      style={{
                        backgroundColor: '#546e7a',
                        padding: '25px',
                        borderRadius: '10px',
                      }}
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateLogo({
                            variables: {
                              id: data.logo._id,
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
                            defaultValue={data.logo.text}
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
                            defaultValue={data.logo.color}
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='fontSize' style={{ color: 'white' }}>
                            Font Size:{' '}
                            {this.state.fontSize || data.logo.fontSize}
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
                            defaultValue={data.logo.fontSize}
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
                              this.setState({
                                backgroundColor: event.target.value,
                              })
                            }
                            defaultValue={data.logo.backgroundColor}
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
                            defaultValue={data.logo.borderColor}
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='fontSize' style={{ color: 'white' }}>
                            Border Radius:{' '}
                            {this.state.borderRadius || data.logo.borderRadius}
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
                            defaultValue={data.logo.borderRadius}
                            onChange={(event) =>
                              this.setState({
                                borderRadius: event.target.value,
                              })
                            }
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='fontSize' style={{ color: 'white' }}>
                            Border Width:{' '}
                            {this.state.borderWidth || data.logo.borderWidth}
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
                            defaultValue={data.logo.borderWidth}
                            onChange={(event) =>
                              this.setState({ borderWidth: event.target.value })
                            }
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='fontSize' style={{ color: 'white' }}>
                            Padding: {this.state.padding || data.logo.padding}
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
                            defaultValue={data.logo.padding}
                            onChange={(event) =>
                              this.setState({ padding: event.target.value })
                            }
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='fontSize' style={{ color: 'white' }}>
                            Margin: {this.state.margin || data.logo.margin}
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
                            defaultValue={data.logo.margin}
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
                    text={this.state.text || data.logo.text}
                    color={this.state.color || data.logo.color}
                    fontSize={this.state.fontSize || data.logo.fontSize}
                    backgroundColor={
                      this.state.backgroundColor || data.logo.backgroundColor
                    }
                    borderColor={
                      this.state.borderColor || data.logo.borderColor
                    }
                    borderRadius={
                      this.state.borderRadius || data.logo.borderRadius
                    }
                    borderWidth={
                      this.state.borderWidth || data.logo.borderRadius
                    }
                    padding={this.state.padding || data.logo.padding}
                    margin={this.state.margin || data.logo.margin}
                  ></LogoWorkspace>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default EditLogoScreen;
