import React, { Component } from 'react';

class DeleteModal extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          position: 'fixed',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          visibility: this.props.visibility ? 'visible' : 'hidden',
        }}
      >
        <div
          style={{
            padding: '10px',
            position: 'relative',
            maxWidth: '800px',
            maxHeight: '80vh',
            borderRadius: '5px',
            background: 'var(--swatch-complement)',
            overflow: 'auto',
            cursor: 'default',
            borderRadius: '25px',
            borderStyle: 'solid',
            borderColor: 'black',
          }}
        >
          <section style={{ textAlign: 'center' }}>
            <p>
              <strong style={{ fontWeight: 'bold', fontSize: '120%' }}>
                Are you sure you want to delete this logo?
              </strong>
            </p>
            <div style={{ display: 'inline-block', marginBottom: '10px' }}>
              <button
                className='waves-light btn-small'
                style={{ display: 'inline-block', marginRight: '8px' }}
                onClick={this.props.removeLogo}
              >
                Yes
              </button>
              <button
                className='waves-light btn-small'
                style={{ display: 'inline-block', marginLeft: '8px' }}
                onClick={() => this.props.deleteModalVisibility(false)}
              >
                No
              </button>
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '110%' }}>
              The logo will not be retreivable.
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default DeleteModal;
