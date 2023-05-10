import styles from "./modalMulti.module.css";
import { useNavigate } from 'react-router-dom';

const GameModal = ({ nextRound, mark, textColor, handleIndex, roundTied }) => {
    const navigate = useNavigate();
    function handleQuit(e) {
        e.preventDefault();
        navigate("/");
        sessionStorage.clear();
    };

    return (
        <>
            <section className={styles.modal}>
                <h5 className={styles.playerWins}> {handleIndex} </h5>
                <div className={styles.markWins}>
                    {roundTied === false && <img className={styles.markImg} src={mark} alt="" />}
                    <span className={textColor}>{roundTied ? "ROUND TIED" : "TAKES THE ROUND"}</span>
                </div>
                <div className={styles.buttonOptions}>
                    <button className={styles.quit} onClick={handleQuit}>QUIT</button>
                    <button className={styles.next} onClick={nextRound}>NEXT ROUND</button>
                </div>
            </section>
            <div className={styles.overlay}></div>
        </>
    );
};

export default GameModal;