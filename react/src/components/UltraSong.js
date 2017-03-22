import React, { PropTypes } from 'react'
import UltraParagraph from './UltraParagraph';

const UltraSong = ({song, paragraphBeatMove}) => {

  let paragraphs = song.lines.map((line, index) => {
    //console.log(line);
    return (
      <UltraParagraph key={index} paragraph={line} paragraphBeatMove={(key, beats) => {paragraphBeatMove(key, beats)}}/>
    );
    
  }
  );

  const divStyle = {
    background: 'yellow',
    width:10000,
  };

  return (
      <div style={divStyle}>
        UltraSong
        {paragraphs}
      </div>
    );
  };

  UltraSong.propTypes = {
    song: PropTypes.object.isRequired
  }

  export default UltraSong;