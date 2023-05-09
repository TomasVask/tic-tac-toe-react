import React from "react";

const Button = ({ onClick, onEnter, onLeave, classTitle }) => {
    return (
        <button
            className={classTitle}
            onPointerEnter={onEnter}
            onPointerLeave={onLeave}
            onClick={onClick}
        ></button>
    );
};

export default Button;