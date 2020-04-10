import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {
  render() {
    return (
      <Query pollInterval={500} query={GET_LOGOS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          console.log(data.logos);
          return (
            <div
              className='container row'
              style={{
                backgroundColor: 'rgb(230, 230, 230)',
                margin: '0 auto',
                marginTop: '50px',
                paddingTop: '20px',
              }}
            >
              <div className='col s4'>
                <h3
                  style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '250%',
                  }}
                >
                  Recent Logos
                </h3>
                {data.logos
                  .sort((a, b) => {
                    let dateA = new Date(a.lastUpdate).getTime();
                    let dateB = new Date(b.lastUpdate).getTime();
                    return dateB - dateA;
                  })
                  .map((logo, index) => (
                    <div
                      key={index}
                      className='home_logo_link'
                      style={{ cursor: 'pointer' }}
                    >
                      <Link
                        to={`/view/${logo._id}`}
                        style={{
                          textDecoration: 'none',
                          color: 'black',
                          fontSize: '120%',
                        }}
                      >
                        {logo.text}
                      </Link>
                    </div>
                  ))}
              </div>
              <div className='col s8'>
                <div id='home_banner_container'>GoLogoLo</div>
                <div
                  className='z-depth-5'
                  style={{
                    cursor: 'pointer',
                    fontSize: '180%',
                    marginTop: '20px',
                    backgroundColor: 'rgb(240,240,240)',
                    width: '50%',
                    borderRadius: '50px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    textAlign: 'center',
                    marginBottom: '25px',
                  }}
                  onClick={() => this.props.history.push('/create')}
                >
                  Create Logo
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default HomeScreen;
