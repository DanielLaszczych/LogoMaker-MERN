import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import LogoWorkspace from './LogoWorkspace';
import DeleteModal from './DeleteModal';
import Button from 'react-bootstrap/Button';

const GET_LOGO = gql`
  query logo($logoId: String) {
    logo(id: $logoId) {
      _id
      logoName
      height
      width
      texts {
        id
        text
        color
        fontSize
        x
        y
        zIndex
      }
      images {
        id
        src
        height
        width
        x
        y
        zIndex
      }
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
  state = {
    deleteModalVisible: false,
    currentText: 0,
    currentImage: 0,
    loggedIn: false,
    userInfo: {},
    dataUrl: '',
    texts: false,
    images: false,
    loadingData: true,
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

  deleteModalVisibility = (visibility) => {
    this.setState({ deleteModalVisible: visibility });
  };

  render() {
    return this.state.loggedIn ? (
      <Query
        fetchPolicy='network-only'
        onCompleted={() => {
          console.log('done');
          this.setState({ loadingData: false });
        }}
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
                  onClick={() => this.props.history.push('/home')}
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
                    <dt style={{ color: 'white' }}>Logo Name:</dt>
                    <dd style={{ color: 'white', marginBottom: '20px' }}>
                      {data.logo.logoName}
                    </dd>
                    <dt style={{ color: 'white' }}>Logo Dimensions:</dt>
                    <dt style={{ color: 'white' }}>Height:</dt>
                    <dd style={{ color: 'white', marginBottom: '20px' }}>
                      {data.logo.height}
                    </dd>
                    <dt style={{ color: 'white' }}>Width:</dt>
                    <dd style={{ color: 'white', marginBottom: '20px' }}>
                      {data.logo.width}
                    </dd>
                    {data.logo.texts.length > 0 ? (
                      <React.Fragment>
                        <dt style={{ color: 'white' }}>
                          Text #{data.logo.texts[this.state.currentText].id}
                        </dt>
                        <dt style={{ color: 'white' }}>Text:</dt>
                        <dd style={{ color: 'white', marginBottom: '20px' }}>
                          {data.logo.texts[this.state.currentText].text}
                        </dd>
                        <dt style={{ color: 'white' }}>Priority:</dt>
                        <dd style={{ color: 'white', marginBottom: '20px' }}>
                          {data.logo.texts[this.state.currentText].zIndex}
                        </dd>
                        <dt style={{ color: 'white' }}>Font Size:</dt>
                        <dd style={{ color: 'white', marginBottom: '20px' }}>
                          {data.logo.texts[this.state.currentText].fontSize}
                        </dd>
                        <dt style={{ color: 'white' }}>Color:</dt>
                        <dd style={{ color: 'white', marginBottom: '20px' }}>
                          {data.logo.texts[this.state.currentText].color}
                        </dd>
                        <div
                          className='form-group'
                          style={{ textAlign: 'center' }}
                        >
                          <Button
                            onClick={() => {
                              if (this.state.currentText > 0)
                                this.setState({
                                  currentText: this.state.currentText - 1,
                                });
                            }}
                            variant={
                              this.state.currentText > 0
                                ? 'danger'
                                : 'outline-danger'
                            }
                            style={{ textAlign: 'center', marginRight: '15px' }}
                          >
                            {'<'}
                          </Button>
                          <Button
                            onClick={() => {
                              if (
                                data.logo.texts.length > 1 &&
                                this.state.currentText !==
                                  data.logo.texts.length - 1
                              )
                                this.setState({
                                  currentText: this.state.currentText + 1,
                                });
                            }}
                            variant={
                              data.logo.texts.length > 1 &&
                              this.state.currentText !==
                                data.logo.texts.length - 1
                                ? 'danger'
                                : 'outline-danger'
                            }
                            style={{ textAlign: 'center', marginLeft: '15px' }}
                          >
                            {'>'}
                          </Button>
                        </div>
                      </React.Fragment>
                    ) : null}
                    {data.logo.images.length > 0 ? (
                      <React.Fragment>
                        <dt style={{ color: 'white' }}>
                          Image #{data.logo.images[this.state.currentImage].id}
                        </dt>
                        <dt style={{ color: 'white' }}>Src:</dt>
                        <dd
                          style={{
                            color: 'white',
                            marginBottom: '20px',
                            wordBreak: 'break-all',
                            maxWidth: '250px',
                          }}
                        >
                          {data.logo.images[this.state.currentImage].src}
                        </dd>
                        <dt style={{ color: 'white' }}>Priority:</dt>
                        <dd style={{ color: 'white', marginBottom: '20px' }}>
                          {data.logo.images[this.state.currentImage].zIndex}
                        </dd>
                        <div
                          className='form-group'
                          style={{ textAlign: 'center' }}
                        >
                          <Button
                            onClick={() => {
                              if (this.state.currentImage > 0)
                                this.setState({
                                  currentImage: this.state.currentImage - 1,
                                });
                            }}
                            variant={
                              this.state.currentImage > 0
                                ? 'danger'
                                : 'outline-danger'
                            }
                            style={{ textAlign: 'center', marginRight: '15px' }}
                          >
                            {'<'}
                          </Button>
                          <Button
                            onClick={() => {
                              if (
                                data.logo.images.length > 1 &&
                                this.state.currentImage !==
                                  data.logo.images.length - 1
                              )
                                this.setState({
                                  currentImage: this.state.currentImage + 1,
                                });
                            }}
                            variant={
                              data.logo.images.length > 1 &&
                              this.state.currentImage !==
                                data.logo.images.length - 1
                                ? 'danger'
                                : 'outline-danger'
                            }
                            style={{ textAlign: 'center', marginLeft: '15px' }}
                          >
                            {'>'}
                          </Button>
                        </div>
                      </React.Fragment>
                    ) : null}
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
                    onCompleted={() => this.props.history.push('/home')}
                  >
                    {(removeLogo, { loading, error }) => (
                      <div>
                        <DeleteModal
                          removeLogo={() =>
                            removeLogo({ variables: { id: data.logo._id } })
                          }
                          visibility={this.state.deleteModalVisible}
                          deleteModalVisibility={this.deleteModalVisibility}
                        ></DeleteModal>
                        <div>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              this.deleteModalVisibility(true);
                            }}
                          >
                            <Link
                              to={`/edit/${data.logo._id}`}
                              className='btn btn-success'
                            >
                              Edit
                            </Link>
                            <button
                              type='submit'
                              className='btn btn-danger ml-3 mr-3'
                            >
                              Delete
                            </button>
                            <Button
                              onClick={() => {
                                var a = document.createElement('a');
                                a.href = this.state.dataUrl;
                                a.download = data.logo.logoName + '.png';
                                a.click();
                              }}
                            >
                              Save
                            </Button>
                          </form>
                          {loading && <p>Loading...</p>}
                          {error && <p>Error :( Please try again</p>}
                        </div>
                      </div>
                    )}
                  </Mutation>
                </div>
              </div>
              {!this.state.loadingData ? (
                <LogoWorkspace
                  onSave={(newDataUrl) => {
                    this.setState({ dataUrl: newDataUrl });
                  }}
                  texts={this.state.texts || data.logo.texts}
                  images={this.state.images || data.logo.images}
                  backgroundColor={data.logo.backgroundColor}
                  borderColor={data.logo.borderColor}
                  borderRadius={data.logo.borderRadius}
                  borderWidth={data.logo.borderWidth}
                  padding={data.logo.padding}
                  margin={data.logo.margin}
                  height={data.logo.height}
                  width={data.logo.width}
                  disabledEditing={true}
                ></LogoWorkspace>
              ) : null}
            </div>
          );
        }}
      </Query>
    ) : null;
  }
}

export default ViewLogoScreen;
