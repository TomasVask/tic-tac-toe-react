import React from "react";
import styles from "./404.module.css";
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.main}>
            <div className={styles.xZeroLogos}>
                <img
                    src="../starter-code/assets/logo.svg"
                    alt=""
                />
            </div>
            <div className={styles.notFound}>404 This page does not exist</div>
            <p className={styles.return}>Return to the main menu and continue enjoying the game!</p>
            <button className={styles.button}
                onClick={() => navigate("/")}
            >Start a new game</button>
        </div>
    )
};

export default PageNotFound;