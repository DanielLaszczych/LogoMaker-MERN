import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
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

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id: $id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {
  render() {
    return (
      <Query
        pollInterval={500}
        query={GET_LOGO}
        variables={{ logoId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
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
                  <dl>
                    <dt style={{ color: 'white' }}>Text:</dt>
                    <dd style={{ color: 'white', marginBottom: '20px' }}>
                      {data.logo.text}
                    </dd>
                    <dt style={{ color: 'white' }}>Color:</dt>
                    <dd style={{ color: 'white', marginBottom: '20px' }}>
                      {data.logo.color}
                    </dd>
                    <dt style={{ color: 'white' }}>Font Size:</dt>
                    <dd style={{ color: 'white', marginBottom: '20px' }}>
                      {data.logo.fontSize} pixels
                    </dd>
                    <dt style={{ color: 'white' }}>Background Color:</dt>
                    <dd style={{ color: 'white', marginBottom: '20px' }}>
                      {data.logo.backgroundColor}
                    </dd>
                    <dt style={{ color: 'white' }}>Border Color:</dt>
                    <dd style={{ color: 'white', marginBottom: '20px' }}>
                      {data.logo.borderColor}
                    </dd>
                    <dt style={{ color: 'white' }}>Border Width:</dt>
                    <dd style={{ color: 'white', marginBottom: '20px' }}>
                      {data.logo.borderWidth}
                    </dd>
                    <dt style={{ color: 'white' }}>Padding:</dt>
                    <dd style={{ color: 'white', marginBottom: '20px' }}>
                      {data.logo.padding}
                    </dd>
                    <dt style={{ color: 'white' }}>Margin:</dt>
                    <dd style={{ color: 'white', marginBottom: '20px' }}>
                      {data.logo.margin}
                    </dd>
                    <dt style={{ color: 'white' }}>Last Updated:</dt>
                    <dd style={{ color: 'white', marginBottom: '20px' }}>
                      {data.logo.lastUpdate}
                    </dd>
                  </dl>
                  <Mutation
                    mutation={DELETE_LOGO}
                    key={data.logo._id}
                    onCompleted={() => this.props.history.push('/')}
                  >
                    {(removeLogo, { loading, error }) => (
                      <div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            removeLogo({ variables: { id: data.logo._id } });
                          }}
                        >
                          <Link
                            to={`/edit/${data.logo._id}`}
                            className='btn btn-success mr-3'
                          >
                            Edit
                          </Link>
                          <button type='submit' className='btn btn-danger ml-3'>
                            Delete
                          </button>
                        </form>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error :( Please try again</p>}
                      </div>
                    )}
                  </Mutation>
                </div>
              </div>
              <LogoWorkspace
                text={data.logo.text}
                color={data.logo.color}
                fontSize={data.logo.fontSize}
                backgroundColor={data.logo.backgroundColor}
                borderColor={data.logo.borderColor}
                borderRadius={data.logo.borderRadius}
                borderWidth={data.logo.borderWidth}
                padding={data.logo.padding}
                margin={data.logo.margin}
              ></LogoWorkspace>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ViewLogoScreen;
