import React from 'react';

const Color = ({color, setIsOpen, setCurrentArt}) => {
  if(!color){
    return <div>...loading</div>
  }

  const colorClicked = () => {
    let id = color?.art_id;
    console.log('looking for id:', id);
    fetch(`/api/artwork/${id}`)
      .then(res => res.json())
      .then(data => {
        //console.log('data:', data);
        setCurrentArt(data[0]);
        setIsOpen(true);
      }).catch(err => {
        console.log(err);
      });
  }

  return (
    <div className='colordiv'>
      <button className="colorBtn" style={{backgroundColor: color ? `hsl(${color.color.h}, ${color.color.s}%, ${color.color.l}%)` : 'transparent'}} onClick={colorClicked}>
        </button>
    </div>
  )
}

export default Color;