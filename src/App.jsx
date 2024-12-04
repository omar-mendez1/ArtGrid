import React, {useEffect, useState} from 'react';
import ColorList from './ColorList';
import './App.css'; // Import the CSS file
import Modal from './Modal.jsx'

const App = () => {

  const [colors, setColors] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentArt, setCurrentArt] = React.useState(null);

  useEffect(() => {
    fetch('/api/colors')
      .then(res => res.json())
      .then(data => {
        setColors(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (

    <div className="App">
      <Modal currentArt={currentArt} isOpen={isOpen} setIsOpen={setIsOpen} />
      <ColorList colors={colors} setIsOpen={setIsOpen} setCurrentArt={setCurrentArt} />

    </div>
  );
};

export default App;