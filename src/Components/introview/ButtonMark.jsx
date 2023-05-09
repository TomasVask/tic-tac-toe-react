import React from "react";

const ButtonMark = ({ classInput, classLabel, markId, value, isActive, onClick }) => {
    return (
        <>
            <input
                className={classInput}
                type={'radio'}
                value={value}
                id={markId}
                checked={isActive ? true : false}
                onClick={onClick}
                readOnly
            ></input>
            <label
                className={classLabel}
                htmlFor={markId}
            ></label>
        </>
    );
};

export default ButtonMark;