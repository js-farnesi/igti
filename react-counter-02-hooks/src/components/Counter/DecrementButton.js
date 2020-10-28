import React from 'react';

// podemos desestruturar o onDecrement do props diretamente, muito mais sucinto, deve ser usado quanto tiver poucas props
export default function DecrementButton({ onDecrement }) {
  const handleButtonClick = () => {
    onDecrement('-');
  };

  return (
    <button
      onClick={handleButtonClick}
      className="waves-effect waves-light btn red darken-4"
    >
      -
    </button>
  );
}
