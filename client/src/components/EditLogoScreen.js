import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import LogoWorkspace from './LogoWorkspace';
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

const UPDATE_LOGO = gql`
  mutation updateLogo(
    $id: String!
    $userId: String!
    $logoName: String!
    $height: Int!
    $width: Int!
    $texts: [text!]!
    $images: [image!]!
    $backgroundColor: String!
    $borderColor: String!
    $borderRadius: Int!
    $borderWidth: Int!
    $padding: Int!
    $margin: Int!
  ) {
    updateLogo(
      id: $id
      userId: $userId
      logoName: $logoName
      height: $height
      width: $width
      texts: $texts
      images: $images
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
    set: false,
    id: false,
    currentText: 0,
    currentImage: 0,
    logoName: false,
    texts: false,
    images: false,
    backgroundColor: false,
    borderColor: false,
    borderRadius: false,
    borderWidth: false,
    padding: false,
    margin: false,
    height: false,
    width: false,
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
      <React.Fragment>
        <Query
          query={GET_LOGO}
          variables={{ logoId: this.props.match.params.id }}
          fetchPolicy={'cache-and-network'}
          onCompleted={(data) => {
            let newTexts = data.logo.texts.map((text) => {
              delete text.__typename;
              return text;
            });
            let newImages = data.logo.images.map((image) => {
              delete image.__typename;
              return image;
            });
            this.setState({
              set: true,
              id: data.logo._id,
              texts: newTexts,
              images: newImages,
              height: data.logo.height,
              width: data.logo.width,
              margin: data.logo.margin,
              padding: data.logo.padding,
              backgroundColor: data.logo.backgroundColor,
              borderColor: data.logo.borderColor,
              borderRadius: data.logo.borderRadius,
              borderWidth: data.logo.borderWidth,
              logoName: data.logo.logoName,
              currentImage: data.logo.images.length === 0 ? -1 : 0,
              currentText: data.logo.texts.length === 0 ? -1 : 0,
            });
          }}
        >
          {({ loading, error, data }) => {
            return null;
          }}
        </Query>
        {this.state.set ? (
          <Mutation
            mutation={UPDATE_LOGO}
            key={this.state.id}
            onCompleted={() => this.props.history.push(`/home`)}
          >
            {(updateLogo, { loading, error }) => (
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
                      Edit Logo
                    </h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        updateLogo({
                          variables: {
                            id: this.state.id,
                            userId: this.state.userInfo.id,
                            logoName: this.state.logoName,
                            height: this.state.height,
                            width: this.state.width,
                            texts: this.state.texts,
                            images: this.state.images,
                            backgroundColor: this.state.backgroundColor,
                            borderColor: this.state.borderColor,
                            borderRadius: parseInt(this.state.borderRadius),
                            borderWidth: parseInt(this.state.borderWidth),
                            padding: parseInt(this.state.padding),
                            margin: parseInt(this.state.margin),
                          },
                        });
                      }}
                    >
                      <div className='form-group'>
                        <label htmlFor='text' style={{ color: 'white' }}>
                          Logo Name:
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
                              this.setState({ logoName: event.target.value });
                            } else {
                              event.preventDefault();
                            }
                          }}
                          style={{ display: 'inline-block' }}
                          value={this.state.logoName}
                        />
                      </div>
                      <div className='form-group'>
                        <div>
                          <label htmlFor='fontSize' style={{ color: 'white' }}>
                            Logo Dimensions
                          </label>
                        </div>
                        <div>
                          <label htmlFor='fontSize' style={{ color: 'white' }}>
                            Height: {this.state.height} px
                          </label>
                        </div>
                        <div>
                          <label htmlFor='fontSize' style={{ color: 'white' }}>
                            Width: {this.state.width} px
                          </label>
                        </div>
                      </div>
                      {this.state.texts.length > 0 ? (
                        <React.Fragment>
                          <div className='form-group'>
                            <label
                              htmlFor='text'
                              style={{
                                color: 'white',
                              }}
                            >
                              Text: #
                              {this.state.texts[this.state.currentText].id}
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              name='text'
                              placeholder='Text'
                              onChange={(event) => {
                                const newTexts = [...this.state.texts];
                                const index = newTexts.indexOf(
                                  this.state.texts[this.state.currentText]
                                );
                                newTexts[index] = {
                                  ...this.state.texts[this.state.currentText],
                                };
                                newTexts[index].text = event.target.value;
                                this.setState({ texts: newTexts });
                              }}
                              value={
                                this.state.texts[this.state.currentText].text
                              }
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
                                      ...this.state.texts[
                                        this.state.currentText
                                      ],
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
                            <label
                              htmlFor='fontSize'
                              style={{ color: 'white' }}
                            >
                              Font Size:{' '}
                              {
                                this.state.texts[this.state.currentText]
                                  .fontSize
                              }
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
                                this.state.texts[this.state.currentText]
                                  .fontSize
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
                                newTexts[index].fontSize = parseInt(
                                  event.target.value
                                );
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
                              value={
                                this.state.texts[this.state.currentText].color
                              }
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
                                  newCurrentText = -1;
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
                                  : this.state.texts[
                                      this.state.texts.length - 1
                                    ].id + 1,
                              text: 'GoLogoLo Logo',
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
                              this.state.currentText !==
                                this.state.texts.length - 1
                            )
                              this.setState({
                                currentText: this.state.currentText + 1,
                              });
                          }}
                          variant={
                            this.state.texts.length > 1 &&
                            this.state.currentText !==
                              this.state.texts.length - 1
                              ? 'danger'
                              : 'outline-danger'
                          }
                          style={{ textAlign: 'center' }}
                        >
                          {'>'}
                        </Button>
                      </div>
                      {this.state.images.length > 0 ? (
                        <React.Fragment>
                          <div className='form-group'>
                            <label
                              htmlFor='text'
                              style={{
                                color: 'white',
                              }}
                            >
                              Image: #
                              {this.state.images[this.state.currentImage].id}
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              name='text'
                              placeholder='Text'
                              onChange={(event) => {
                                const newImages = [...this.state.images];
                                const index = newImages.indexOf(
                                  this.state.images[this.state.currentImage]
                                );
                                newImages[index] = {
                                  ...this.state.images[this.state.currentImage],
                                };
                                newImages[index].src = event.target.value;
                                this.setState({ images: newImages });
                              }}
                              value={
                                this.state.images[this.state.currentImage].src
                              }
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
                              {
                                this.state.images[this.state.currentImage]
                                  .zIndex
                              }
                            </label>
                            <div style={{ textAlign: 'center' }}>
                              <Button
                                onClick={() => {
                                  if (
                                    this.state.images[this.state.currentImage]
                                      .zIndex > 0
                                  ) {
                                    const newImages = [...this.state.images];
                                    const index = newImages.indexOf(
                                      this.state.images[this.state.currentImage]
                                    );
                                    newImages[index] = {
                                      ...this.state.images[
                                        this.state.currentImage
                                      ],
                                    };
                                    newImages[index].zIndex =
                                      this.state.images[this.state.currentImage]
                                        .zIndex - 1;
                                    this.setState({ images: newImages });
                                  }
                                }}
                                variant={
                                  this.state.images[this.state.currentImage]
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
                                  const newImages = [...this.state.images];
                                  const index = newImages.indexOf(
                                    this.state.images[this.state.currentImage]
                                  );
                                  newImages[index] = {
                                    ...this.state.images[
                                      this.state.currentImage
                                    ],
                                  };
                                  newImages[index].zIndex =
                                    this.state.images[this.state.currentImage]
                                      .zIndex + 1;
                                  this.setState({ images: newImages });
                                }}
                                variant='success'
                                style={{ width: '30%', marginLeft: '10px' }}
                              >
                                Up
                              </Button>
                            </div>
                          </div>
                          <div
                            className='form-group'
                            style={{ textAlign: 'center' }}
                          >
                            <Button
                              variant='danger'
                              onClick={() => {
                                const newImages = [...this.state.images];
                                newImages.splice(this.state.currentImage, 1);
                                for (
                                  let i = this.state.currentImage;
                                  i < newImages.length;
                                  i++
                                ) {
                                  newImages[i].id = newImages[i].id - 1;
                                }
                                let newCurrentImage = 0;
                                if (this.state.images.length === 1) {
                                  newCurrentImage = -1;
                                } else if (
                                  this.state.images.length > 1 &&
                                  this.state.currentImage === 0
                                ) {
                                  newCurrentImage = 0;
                                } else {
                                  newCurrentImage = this.state.currentImage - 1;
                                }
                                this.setState({
                                  images: newImages,
                                  currentImage: newCurrentImage,
                                });
                              }}
                            >
                              Remove image
                            </Button>
                          </div>
                        </React.Fragment>
                      ) : null}
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
                          style={{ textAlign: 'center' }}
                        >
                          {'<'}
                        </Button>
                        <Button
                          style={{ marginLeft: '25px', marginRight: '25px' }}
                          variant='success'
                          onClick={() => {
                            let newImage = {
                              id:
                                this.state.images.length === 0
                                  ? 1
                                  : this.state.images[
                                      this.state.images.length - 1
                                    ].id + 1,
                              src: 'https://i.imgur.com/8u3skSq.png',
                              height: 100,
                              width: 100,
                              x: this.state.padding + this.state.borderWidth,
                              y: this.state.padding + this.state.borderWidth,
                              zIndex: 0,
                            };
                            let newImages = [...this.state.images];
                            newImages.push(newImage);
                            this.setState({
                              images: newImages,
                              currentImage: this.state.currentImage + 1,
                            });
                          }}
                        >
                          Add image
                        </Button>
                        <Button
                          onClick={() => {
                            if (
                              this.state.images.length > 1 &&
                              this.state.currentImage !==
                                this.state.images.length - 1
                            )
                              this.setState({
                                currentImage: this.state.currentImage + 1,
                              });
                          }}
                          variant={
                            this.state.images.length > 1 &&
                            this.state.currentImage !==
                              this.state.images.length - 1
                              ? 'danger'
                              : 'outline-danger'
                          }
                          style={{ textAlign: 'center' }}
                        >
                          {'>'}
                        </Button>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='color' style={{ color: 'white' }}>
                          Background Color:
                        </label>
                        <input
                          type='color'
                          className='form-control'
                          name='backgroundColor'
                          placeholder='Background Color'
                          onChange={(event) =>
                            this.setState({
                              backgroundColor: event.target.value,
                            })
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
                          min='0'
                          max='25'
                          step='1'
                          value={this.state.borderRadius}
                          onChange={(event) =>
                            this.setState({
                              borderRadius: event.target.value,
                            })
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
                    {error && (
                      <p>Error :( Please try again + {error.message}</p>
                    )}
                  </div>
                </div>
                <LogoWorkspace
                  texts={this.state.texts}
                  images={this.state.images}
                  backgroundColor={this.state.backgroundColor}
                  borderColor={this.state.borderColor}
                  borderRadius={this.state.borderRadius}
                  borderWidth={parseInt(this.state.borderWidth)}
                  padding={parseInt(this.state.padding)}
                  margin={parseInt(this.state.margin)}
                  height={parseInt(this.state.height)}
                  width={parseInt(this.state.width)}
                  disabledEditing={false}
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
                    const newImages = [...this.state.images];
                    newImages.forEach((image) => {
                      const adjustX = oldWidth - size.width;
                      const adjustY = oldHeight - size.height;
                      if (image.x !== 0 && image.x > 0) {
                        image.x -= adjustX;
                      } else {
                        image.x = 0;
                      }
                      if (image.y !== 0 && image.y > 0) {
                        image.y -= adjustY;
                      } else {
                        image.y = 0;
                      }
                    });
                  }}
                  onResizeImage={(
                    e,
                    direction,
                    ref,
                    delta,
                    position,
                    image
                  ) => {
                    const newImages = [...this.state.images];
                    const index = newImages.indexOf(image);
                    newImages[index] = { ...image };
                    newImages[index].height = ref.offsetHeight;
                    newImages[index].width = ref.offsetWidth;
                    this.setState({ images: newImages });
                  }}
                  onDragText={(event, position, text) => {
                    const newTexts = [...this.state.texts];
                    const index = newTexts.indexOf(text);
                    newTexts[index] = { ...text };
                    newTexts[index].x = position.x;
                    newTexts[index].y = position.y;
                    this.setState({ texts: newTexts });
                  }}
                  onDragImage={(
                    event,
                    position,
                    image,
                    imageWidth,
                    imageHeight
                  ) => {
                    const newImages = [...this.state.images];
                    const index = newImages.indexOf(image);
                    newImages[index] = { ...image };
                    let sumWidth = imageWidth;
                    let sumHeight = imageHeight;
                    let newX = position.x;
                    let newY = position.y;
                    if (
                      sumWidth + position.x >
                        this.state.width -
                          (this.state.padding + this.state.borderWidth) -
                          1.5 ||
                      sumWidth + position.x >
                        this.state.width -
                          (this.state.padding + this.state.borderWidth) +
                          1.5
                    ) {
                      newX =
                        position.x -
                        (position.x +
                          imageWidth +
                          this.state.padding +
                          this.state.borderWidth -
                          this.state.width);
                    } else if (
                      position.x <
                        this.state.padding + this.state.borderWidth - 1.5 ||
                      position.x <
                        this.state.padding + this.state.borderWidth + 1.5
                    ) {
                      newX =
                        position.x +
                        this.state.padding +
                        this.state.borderWidth;
                    }
                    if (
                      sumHeight + position.y >
                        this.state.height -
                          (this.state.padding + this.state.borderWidth) -
                          1.5 ||
                      sumHeight + position.y >
                        this.state.height -
                          (this.state.padding + this.state.borderWidth) +
                          1.5
                    ) {
                      newY =
                        position.y -
                        (position.y +
                          imageHeight +
                          this.state.padding +
                          this.state.borderWidth -
                          this.state.height);
                    } else if (
                      position.y <
                        this.state.padding + this.state.borderWidth - 1.5 ||
                      position.y <
                        this.state.padding + this.state.borderWidth + 1.5
                    ) {
                      newY =
                        position.y +
                        this.state.padding +
                        this.state.borderWidth;
                    }
                    newImages[index].x = newX;
                    newImages[index].y = newY;
                    this.setState({ images: newImages });
                  }}
                  rePosition={(newTexts, newImages) => {
                    this.setState({ texts: newTexts, images: newImages });
                  }}
                ></LogoWorkspace>
              </div>
            )}
          </Mutation>
        ) : null}
      </React.Fragment>
    ) : null;
  }
}

export default EditLogoScreen;
