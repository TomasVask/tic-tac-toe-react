import React from 'react';

const ButtonMultiplayer = ({ value, className, disabled, onClick }) => {
    return (
        <input
            className={className}
            type={'submit'}
            value={value}
            disabled={disabled}
            onClick={onClick}
        />
    );
};

export default ButtonMultiplayer;