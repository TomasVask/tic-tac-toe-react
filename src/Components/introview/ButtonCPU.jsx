import React from "react";

const ButtonCPU = ({ disabled, onChange, value, classInput }) => {
    return (
        <div>
            <select className={classInput}
                disabled={disabled}
                onChange={onChange}
                value={value}
            >
                <option>NEW GAME VS CPU</option>
                <option key="beginner" value="beginner">Pick your level - BEGINNER</option>
                <option key="intermediate" value="intermediate" >Pick your level - INTERMEDIATE</option>
                <option key="advanced" value="advanced">Pick your level - ADVANCED</option>
            </select>
        </div>
    );
};

export default ButtonCPU;
