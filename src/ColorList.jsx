import React from 'react';
import Color from './Color';

const ColorList = ({colors, setIsOpen, setCurrentArt}) => {

  return (
    <div className='colorList'>
      {colors?.slice(1000, 5000).map(color => (
        <Color color={color} setIsOpen={setIsOpen} setCurrentArt={setCurrentArt}/>
      ))}
    </div>
  )
}

export default ColorList;