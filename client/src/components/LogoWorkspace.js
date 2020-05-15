import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import { Resizable, ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import '../App.css';

class LogoWorkspace extends Component {
  compareProps(prevProps, newProps) {
    let differentTexts = false;
    if (
      prevProps.padding !== newProps.padding ||
      prevProps.borderWidth !== newProps.borderWidth
    ) {
      return true;
    } else if (prevProps.texts.length !== newProps.texts.length) {
      return false;
    } else {
      for (let i = 0; i < prevProps.texts.length; i++) {
        if (prevProps.texts[i].fontSize !== newProps.texts[i].fontSize) {
          differentTexts = true;
          break;
        }
      }
      return differentTexts;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.compareProps(prevProps, this.props)) {
      let newTexts = [];
      this.props.texts.forEach((text) => {
        let newText = { ...text };
        let width = document.getElementById(text.id + 'text').offsetWidth;
        let height = document.getElementById(text.id + 'text').offsetHeight;
        let sumWidth =
          width + this.props.padding * 2 + this.props.borderWidth * 2;
        let sumHeight =
          height + this.props.padding * 2 + this.props.borderWidth * 2;
        if (
          (sumWidth + text.x > this.props.width - 1.5 ||
            sumWidth + text.x > this.props.width + 1.5) &&
          text.x !== 0
        ) {
          newText.x =
            text.x -
            (text.x +
              width +
              this.props.padding * 2 +
              this.props.borderWidth * 2 -
              this.props.width);
        }
        if (
          (sumHeight + text.y > this.props.height - 1.5 ||
            sumHeight + text.y > this.props.height + 1.5) &&
          text.y !== 0
        ) {
          newText.y =
            text.y -
            (text.y +
              height +
              this.props.padding * 2 +
              this.props.borderWidth * 2 -
              this.props.height);
        }
        newTexts.push(newText);
      });
      let newImages = [];
      this.props.images.forEach((image) => {
        let newImage = { ...image };
        let sumWidth = document.getElementById(image.id + 'image').offsetWidth;
        let sumHeight = document.getElementById(image.id + 'image')
          .offsetHeight;
        if (
          sumWidth + image.x >
            this.props.width -
              (this.props.padding + this.props.borderWidth) -
              1.5 ||
          sumWidth + image.x >
            this.props.width -
              (this.props.padding + this.props.borderWidth) +
              1.5
        ) {
          console.log('working');
          console.log(this.props.borderWidth);
          newImage.x =
            image.x -
            (this.props.padding +
              this.props.borderWidth -
              (prevProps.padding + prevProps.borderWidth));
        } else if (
          image.x < this.props.padding + this.props.borderWidth - 1.5 ||
          image.x < this.props.padding + this.props.borderWidth + 1.5
        ) {
          newImage.x =
            image.x +
            (this.props.padding +
              this.props.borderWidth -
              (prevProps.padding + prevProps.borderWidth));
        }
        if (
          sumHeight + image.y >
            this.props.height -
              (this.props.padding + this.props.borderWidth) -
              1.5 ||
          sumHeight + image.y >
            this.props.height -
              (this.props.padding + this.props.borderWidth) +
              1.5
        ) {
          newImage.y =
            image.y -
            (this.props.padding +
              this.props.borderWidth -
              (prevProps.padding + prevProps.borderWidth));
        } else if (
          image.y < this.props.padding + this.props.borderWidth - 1.5 ||
          image.y < this.props.padding + this.props.borderWidth + 1.5
        ) {
          newImage.y =
            image.y +
            (this.props.padding +
              this.props.borderWidth -
              (prevProps.padding + prevProps.borderWidth));
        }
        newImages.push(newImage);
      });
      this.props.rePosition(newTexts, newImages);
    }
  }

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
        <ResizableBox
          minConstraints={[60, 60]}
          height={this.props.height}
          width={this.props.width}
          onResize={(event, { element, size, handle }) =>
            this.props.onResize(event, { element, size, handle })
          }
        >
          <div
            style={{
              position: 'relative',
              height: this.props.height + 'px',
              width: this.props.width + 'px',
              backgroundColor: this.props.backgroundColor,
              borderColor: this.props.borderColor,
              borderStyle: 'solid',
              borderRadius: this.props.borderRadius + 'px',
              borderWidth: this.props.borderWidth + 'px',
              padding: this.props.padding + 'px',
              margin: this.props.margin + 'px',
              // display: 'inline-block',
            }}
          >
            {this.props.texts.map((text) => (
              <Draggable
                key={text.id + 'Draggable'}
                bounds='parent'
                onDrag={(e, position) =>
                  this.props.onDragText(e, position, text)
                }
                position={{ x: text.x, y: text.y }}
              >
                <div
                  id={text.id + 'text'}
                  style={{
                    zIndex: text.zIndex,
                    position: 'absolute',
                    fontSize: text.fontSize + 'px',
                    textAlign: 'center',
                    maxWidth: 'max-content',
                    wordBreak: 'break-word',
                    color: text.color,
                  }}
                >
                  {text.text}
                </div>
              </Draggable>
            ))}
            {this.props.images.map((image) => (
              <Rnd
                bounds='parent'
                key={image.id + 'rnd'}
                size={{ width: image.width, height: image.height }}
                position={{ x: image.x, y: image.y }}
                onDragStop={(e, d) =>
                  this.props.onDragImage(e, d, image, image.width, image.height)
                }
                onResize={(e, direction, ref, delta, position) =>
                  this.props.onResizeImage(
                    e,
                    direction,
                    ref,
                    delta,
                    position,
                    image
                  )
                }
              >
                <img
                  id={image.id + 'image'}
                  draggable={false}
                  src={image.src}
                  style={{
                    height: image.height,
                    width: image.width,
                    position: 'absolute',
                  }}
                />
              </Rnd>
            ))}
          </div>
        </ResizableBox>
      </div>
    );
  }
}

export default LogoWorkspace;
