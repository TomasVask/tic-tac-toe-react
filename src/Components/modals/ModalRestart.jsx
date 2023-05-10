import React from "react";
import styles from "./modalMulti.module.css";
import { useNavigate } from 'react-router-dom';

const ModalRestart = ({ onShow }) => {
    const navigate = useNavigate();
    function handleQuit(e) {
        e.preventDefault();
        navigate("/");
        sessionStorage.clear();
    };

    return (
        <>
            <section className={styles.modal}>
                <div className={styles.roundTied}>
                    <span className={styles.roundTiedText}>RESTART GAME?</span>
                </div>
                <div className={styles.buttonOptionsTies}>
                    <button className={styles.cancel} onClick={onShow}>NO, CANCEL</button>
                    <button className={styles.restartConfirm} onClick={handleQuit}>YES, RESTART</button>
                </div>
            </section>
            <div className={styles.overlay}></div>
        </>
    );
};

export default ModalRestart;