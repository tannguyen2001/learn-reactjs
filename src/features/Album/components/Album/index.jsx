import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'

Album.propTypes = {
      item: PropTypes.object.isRequired
};

function Album({ album }) {
      return (
            <div className='album' >
                  <div className='album__thumbnailUrl' >
                        <img src={album.thumbnaiUrl} alt={album.name} />
                  </div>
                  <p className='album__name' >{album.name}</p>
            </div>
      );
}

export default Album;