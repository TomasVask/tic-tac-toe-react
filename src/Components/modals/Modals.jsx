import styles from "./modalMulti.module.css"
import { useLocation } from "react-router-dom";

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
                    <button className={styles.quit} onClick={onGameEnd}>QUIT</button>
                    <button className={styles.nextX} onClick={nextRound}>NEXT ROUND</button>
                </div>
            </section>
            <div className={styles.overlay}></div>
        </>
    );
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
                    <button className={styles.quit} onClick={onGameEnd}>QUIT</button>
                    <button className={styles.nextZero} onClick={nextRound}>NEXT ROUND</button>
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
                    <button className={styles.quit} onClick={onGameEnd}>QUIT</button>
                    <button className={styles.nextTies} onClick={nextRound}>NEXT ROUND</button>
                </div>
            </section>
            <div className={styles.overlay}></div>
        </>
    )
};
