import React from 'react';
import { useLocation } from "react-router-dom";
import styles from "./game.module.css";

const Counter = ({ classTitle, scoreX, scoreZero, scoreTies }) => {
    const { state } = useLocation();
    const { pickIndex } = state || {};
    const { gameMode } = state || {};
    function handleRoleX() {
        if (pickIndex === "x") {
            return gameMode === "vsCPU" ? "(YOU)" : "(P1)";
        } else if (pickIndex === "zero") {
            return gameMode === "vsCPU" ? "(CPU)" : "(P2)";
        };
    };

    function handleRoleZero() {
        if (pickIndex === "x") {
            return gameMode === "vsCPU" ? "(CPU)" : "(P2)";
        } else if (pickIndex === "zero") {
            return gameMode === "vsCPU" ? "(YOU)" : "(P1)";
        };
    };

    return (
        <div className={classTitle}>
            <div>
                <span>
                    {classTitle === styles.xCounter ? "X " : classTitle === styles.zeroCounter ? "0 " : "TIES"}
                </span>
                <span>
                    {classTitle === styles.xCounter ? handleRoleX() : classTitle === styles.zeroCounter ? handleRoleZero() : ""}
                </span>
            </div>
            <p >
                {classTitle === styles.xCounter ? scoreX : classTitle === styles.zeroCounter ? scoreZero : scoreTies}
            </p>
        </div >
    );
};

export default Counter;