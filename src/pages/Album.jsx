import React, { Fragment } from 'react';
import './Album.css';
import { useLocation } from 'react-router-dom';
import OpenSea from '../images/opensea.png';
import { ClockCircleOutlined } from '@ant-design/icons';

import { useAlbum } from '../hooks/useAlbum';

const Album = ({ setNftAlbum }) => {
  const { state: album } = useLocation();
  const { albumDetails } = useAlbum(album.contract);

  return (
    <Fragment>
      <div className='albumContent'>
        <div className='topBan'>
          <img // displaying the image of the album in the state.
            src={album.image}
            alt='albumcover'
            className='albumCover'
           >
          </img>
          <div className='albumDeets'>
            <div className=''>ALBUM</div>
            <div className='title'>{ album.title }</div>
          </div>
        </div>

        <div className='topBan'>
          <div className='playButton' onClick={() => setNftAlbum(albumDetails) }>
            PLAY
          </div>
          <div className='openButton' onClick={() => window.open(`https://testnets.opensea.io/assets/mumbai/${album.contract}/1`)}>
            OpenSea
            <img src={OpenSea} className='openLogo' />
          </div>
        </div>

        <div className='tableHeader'>
          <div className='numberHeader'>#</div>
          <div className='titleHeader'>TITLE</div>
          <div className='numberHeader'>
            <ClockCircleOutlined />
          </div>
        </div>

        {albumDetails &&
          albumDetails.map((nft, i) => {
            nft = JSON.parse(nft.metadata);
            return (
              <>
                <div className="tableContent">
                  <div className="numberHeader">{i + 1}</div>
                  <div
                    className="titleHeader"
                    style={{ color: "rgb(205, 203, 203)" }}
                  >
                    {nft.name}
                  </div>
                  <div className="numberHeader">{nft.duration}</div>
                </div>
              </>
            );
          })}
      </div>
    </Fragment>  
  )
}

export default Album;
