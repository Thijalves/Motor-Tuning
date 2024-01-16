import React from 'react';

const Controls = ({ isPaused, togglePause }) => {
  return (
    <div>
      <button onClick={togglePause}>{isPaused ? 'Resume' : 'Pause'}</button>
      {/* Adicione mais botões ou elementos conforme necessário */}
    </div>
  );
};

export default Controls;
