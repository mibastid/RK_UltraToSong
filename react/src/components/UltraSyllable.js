import React, { PropTypes } from 'react'

const UltraSyllable = ({syllable}) => {

  
  return (
    <div >
      UltraSyllable: {syllable.name} - {syllable.beat}
    </div>
  );
};

UltraSyllable.propTypes = {
  syllable: PropTypes.object.isRequired
}

export default UltraSyllable;