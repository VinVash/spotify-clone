import React, { Fragment } from 'react';
import './AudioPlayer.styles.css';
import {Slider} from "antd";
import useAudio from '../hooks/useAudio';
import { useIPFS } from "../hooks/useIPFS";
import { SoundOutlined, StepBackwardOutlined, StepForwardOutlined, PlayCircleFilled, PauseCircleFilled} from "@ant-design/icons";

const AudioPlayer = ({ nftAlbum }) => {
	const { resolveLink } = useIPFS();

	const [playing, duration, toggle, toNextTrack, toPrevTrack, trackProgress, onSearch, onSearchEnd, onVolume, trackIndex] = useAudio(nftAlbum);

	const minSec = (secs) => {
	    const minutes = Math.floor(secs / 60);
	    const returnMin = minutes < 10 ? `0${minutes}` : minutes;
	    const seconds = Math.floor(secs % 60);
	    const returnSec = seconds < 10 ? `0${seconds}` : seconds;

	    return `${returnMin}:${returnSec}`;
	};

    return (
    	<Fragment>
	  		<div className='buttons' style={{ width:'300px', justifyContent:'start' }}>
	  			<img className='cover' src={resolveLink(JSON.parse(nftAlbum[trackIndex].metadata).image)} alt='currentCover' />
	  			<div className=''>
	  				<div className='songTitle'>{JSON.parse(nftAlbum[trackIndex].metadata).name}</div>
	  				<div className='songAlbum'>{nftAlbum[trackIndex].name}</div>
	  			</div>
	  		</div>

	  		<div>
		      <div className="buttons">
		        <StepBackwardOutlined className="forback" onClick={toPrevTrack} />
		        {playing ? 
		            <PauseCircleFilled className="pauseplay" onClick={toggle} /> :
		            <PlayCircleFilled className="pauseplay" onClick={toggle} />
		        }
		        <StepForwardOutlined className="forback" onClick={toNextTrack} />
		      </div>
		      <div className="buttons">
		      {minSec(trackProgress)}
		      <Slider
		        value={trackProgress}
		        step={1}
		        min={0}
		        max={duration ? duration : 0}
		        className="progress" 
		        tooltipVisible={false}
		        onChange={(value) => onSearch(value)}
		        onAfterChange={onSearchEnd}
		      />
		      {duration ? minSec(Math.round(duration)) : "00:00"}
		      </div>
		    </div>
		    <div className="soundDiv">
		          <SoundOutlined />
		          <Slider 
		            className="volume" 
		            defaultValue={100} 
		            tooltipVisible={false}
		            onChange={(value) => onVolume(value/100)}
		          />
		    </div>
	    </Fragment>
    );
};

export default AudioPlayer;
