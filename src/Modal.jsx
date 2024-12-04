import React, {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import './App.css';
export default function Modal({isOpen, setIsOpen, currentArt}) {
  const [description, setDescription] = useState('');

  useEffect(() => {
    if(isOpen && currentArt?.id){
        const parser = new DOMParser();
        let parsedString = parser.parseFromString(currentArt.description, 'text/html');
        parsedString = parsedString.body.textContent;
        if(parsedString === "null"){
          console.log('no description available');
          setDescription('No description available');
        }else{
          setDescription(parsedString);
        }
        console.log('parsedString:', parsedString);
      }
  }, [isOpen, currentArt])

  if(!isOpen){
    return null;
  }

  const closeClicked = () => {
    setIsOpen(false);
  }

  const saveCurrentArt = () => {
    console.log('saving art', currentArt._id);
    fetch(`/api/save/${currentArt._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: currentArt._id })
    })
      .then(res => res.json())
      .then(data => {
        console.log('data:', data);
      }).catch(err => {
        console.log(err);
      });
}

 return createPortal(
   <div className='modal'>
       <div className='modal-container'>
           <div className='modal-body'>
                <div className="left-col">
                  <img src={`https://www.artic.edu/iiif/2/${currentArt?.image_id}/full/600,/0/default.jpg`} alt={currentArt?.title} />
                </div>
                <div className="right-col">
                <p>{currentArt?.title}</p>
                <p>{description}</p>
                <p>{currentArt?.artist_display}</p>
                <p>{currentArt?.medium_display}</p>
                <p>{currentArt?.dimensions}</p>
                <button onClick={saveCurrentArt}>♥️</button>
                </div>
           </div>
           <button onClick={closeClicked}>Close</button>
       </div>

   </div>
   , document.body
 )
}