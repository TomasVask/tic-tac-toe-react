import React from 'react';

const ButtonMultiplayer = ({ className, disabled, onClick }) => {
    return (
        <button
            className={className}
            type={'submit'}
            disabled={disabled}
            onClick={onClick}
        >NEW GAME VS PLAYER</button>
    );
};

export default ButtonMultiplayer;