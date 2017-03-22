import React, { PropTypes } from 'react'
import UltraSyllable from './UltraSyllable';

const UltraParagraph = ({paragraph, paragraphBeatMove}) => {

  let syllables = paragraph.syllables.map((syllable, index) => 
    <UltraSyllable key={index} syllable={syllable}/>
  );

  const divUltraParagraphStyle = {
    position: 'absolute',
    left: paragraph.syllables[0].beat * 10,
    top: 100,
    background: 'green'
  };

  return (
    <div style={divUltraParagraphStyle} draggable='true' onDragEnd={(event) => {paragraphBeatMove(paragraph.key, event.clientX)}}>
      UltraParagraph: {syllables}
      <p > Drag </p>
    </div>
  );
};

UltraParagraph.propTypes = {
  paragraph: PropTypes.object.isRequired,
  paragraphBeatMove: PropTypes.func.isRequired
}

export default UltraParagraph;