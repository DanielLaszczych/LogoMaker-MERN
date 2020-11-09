import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      userId
      logoName
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {
  state = {
    loggedIn: false,
    userInfo: {},
  };

  componentDidMount() {
    fetch('/user')
      .then((res) => res.json())
      .then((res) =>
        this.setState({ userInfo: res }, () => {
          if (Object.keys(this.state.userInfo).length !== 0) {
            this.setState({ loggedIn: true });
          } else {
            this.props.history.push('/');
          }
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return this.state.loggedIn ? (
      <Query pollInterval={500} query={GET_LOGOS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div>
              <div
                className='container'
                style={{
                  backgroundColor: 'rgb(230, 230, 230)',
                  margin: '0 auto',
                  marginTop: '25px',
                  paddingTop: '20px',
                  borderRadius: '15px',
                }}
              >
                <div className='row' style={{ marginBottom: '0px' }}>
                  <div className='col s4'>
                    <h3
                      style={{
                        fontFamily: 'Roboto Mono, monospace',
                        fontSize: '150%',
                      }}
                    >
                      Hey, {this.state.userInfo.displayName}
                    </h3>
                  </div>
                  <div className='col s4'>
                    <h3
                      style={{
                        textAlign: 'end',
                        fontFamily: 'Roboto Mono, monospace',
                        fontSize: '150%',
                        cursor: 'pointer',
                        color: 'black',
                      }}
                    >
                      <a
                        style={{ color: 'black', textDecoration: 'none' }}
                        href='http://localhost:3000/logout'
                      >
                        Logout
                      </a>
                    </h3>
                  </div>
                </div>
                <hr
                  style={{ border: '1px solid black', marginBottom: '30px' }}
                ></hr>
                <div className='row'>
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
                      .filter((logo) => {
                        return logo.userId === this.state.userInfo.id;
                      })
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
                            {logo.logoName}
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
              </div>
            </div>
          );
        }}
      </Query>
    ) : null;
  }
}

export default HomeScreen;
