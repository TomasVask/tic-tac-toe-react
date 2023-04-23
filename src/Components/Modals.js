import React, { useState, useEffect } from 'react';
import styles from "../Stylesheets/modalMulti.module.css"
import { useLocation } from "react-router-dom";
import axios from "axios";

export function ModalXWin({ onGameEnd, nextRound }) {
    const location = useLocation();
    function handleIndexX() {
        if (location.state.gameMode === "vsPlayer") {
            return location.state.pickIndex === "x" ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!"
        } else if (location.state.gameMode === "vsCPU") {
            return location.state.pickIndex === "x" ? "YOU WON!" : "OH NO, YOU LOST..."
        };
    };

    return (
        <>
            <section className={styles.modal}>
                <h5 className={styles.playerWins}> {handleIndexX()} </h5>
                <div className={styles.markWins}>
                    <img className={styles.markImg} src="/starter-code/assets/icon-x.svg" alt="" />
                    <span className={styles.winnerTextX}>TAKES THE ROUND</span>
                </div>
                <div className={styles.buttonOptions}>
                    <form onSubmit={onGameEnd} id="quit" action="/">
                        <button className={styles.quit}>QUIT</button>
                    </form>
                    <form onSubmit={nextRound} id="nextZero" action="">
                        <button className={styles.nextX}>NEXT ROUND</button>
                    </form>
                </div>
            </section>
            <div className={styles.overlay}></div>
        </>
    )
};

export function ModalZeroWin({ onGameEnd, nextRound }) {
    const location = useLocation();
    function handleIndexZero() {
        if (location.state.gameMode === "vsPlayer") {
            return location.state.pickIndex === "zero" ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!"
        } else if (location.state.gameMode === "vsCPU") {
            return location.state.pickIndex === "zero" ? "YOU WON!" : "OH NO, YOU LOST..."
        };
    };

    return (
        <>
            <section className={styles.modal}>
                <h5 className={styles.playerWins}> {handleIndexZero()} </h5>
                <div className={styles.markWins}>
                    <img className={styles.markImg} src="/starter-code/assets/icon-o.svg" alt="" />
                    <span className={styles.winnerTextZero}>TAKES THE ROUND</span>
                </div>
                <div className={styles.buttonOptions}>
                    <form onSubmit={onGameEnd} id="quit" action="/">
                        <button className={styles.quit}>QUIT</button>
                    </form>
                    <form onSubmit={nextRound} id="nextZero" action="">
                        <button className={styles.nextZero}>NEXT ROUND</button>
                    </form>
                </div>
            </section>
            <div className={styles.overlay}></div>
        </>
    )
};

export function ModalTies({ onGameEnd, nextRound }) {
    return (
        <>
            <section className={styles.modal}>
                <div className={styles.roundTied}>
                    <span className={styles.roundTiedText}>ROUND TIED</span>
                </div>
                <div className={styles.buttonOptionsTies}>
                    <form onSubmit={onGameEnd} id="quit" action="/">
                        <button className={styles.quit}>QUIT</button>
                    </form>
                    <form onSubmit={nextRound} id="nextTies" action="/game">
                        <button className={styles.nextTies}>NEXT ROUND</button>
                    </form>
                </div>
            </section>
            <div className={styles.overlay}></div>
        </>
    )
};

export function ModalRestart({ onShow, onGameEnd }) {
    return (
        <>
            <section className={styles.modal}>
                <div className={styles.roundTied}>
                    <span className={styles.roundTiedText}>RESTART GAME?</span>
                </div>
                <div className={styles.buttonOptionsTies}>
                    <form onSubmit={onShow} id="quit" action="">
                        <button className={styles.cancel}>NO, CANCEL</button>
                    </form>
                    <form onSubmit={onGameEnd} id="restartConfirm" action="/">
                        <button className={styles.restartConfirm}>YES, RESTART</button>
                    </form>
                </div>
            </section>
            <div className={styles.overlay}></div>
        </>
    )
};

export function ModalQuotes({ onClick }) {
    const [quote, setQuote] = useState();

    useEffect(() => {
        let ignore = false;
        async function fetchData() {
            try {
                const response = await axios.get("/api/random");
                if (!ignore) {
                    setQuote(response)
                }
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
        return () => {
            ignore = true;
        }
    }, [])

    return (
        <div>
            <div className={styles.quote}>
                <span onClick={onClick} className={`${styles.btnClose} ${styles.modalClose}`} title="Click to close this dialog">&times;</span>
                <p>Some random wisdom before you start the game &#128519;</p>

                {quote ? <q>{quote.data.body}</q> : "Loading ..."}
                <figcaption>&mdash; {quote && quote.data.author}</figcaption>
            </div>
            <div className={styles.overlayQuote}></div>
        </div>
    )
};