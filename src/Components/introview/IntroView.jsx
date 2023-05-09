import React, { useId, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './intro.module.css';
import ButtonMultiplayer from './ButtonMultiplayer';
import ButtonCPU from './ButtonCPU';
import ButtonMark from './ButtonMark';

const IntroView = () => {
    const id = useId();
    const [isDisabled, setIsDisabled] = useState(true);
    const [pickIndex, setPickIndex] = useState("");
    const levelRef = useRef("")
    const navigate = useNavigate();
    return (
        <div className={styles.mainContainer}>
            <form>
                <div className={styles.xZeroLogos}>
                    <img
                        src="../starter-code/assets/logo.svg"
                        alt=""
                    />
                </div>
                <div className={styles.pickMarkBox}>
                    <p>PICK PLAYER 1'S MARK</p>
                    <div className={styles.buttonBox}>
                        <ButtonMark
                            classInput="P1"
                            value="xButton"
                            classLabel={styles.player1}
                            markId={id + 'x'}
                            isActive={pickIndex === 'x'}
                            onClick={() => {
                                setPickIndex('x');
                                setIsDisabled(false);
                            }}
                        />
                        <ButtonMark
                            classInput="P2"
                            value="zeroButton"
                            classLabel={styles.player2}
                            markId={id + 'zero'}
                            isActive={pickIndex === 'zero'}
                            onClick={() => {
                                setPickIndex('zero');
                                setIsDisabled(false);
                            }}
                        />
                    </div>
                    <p>REMEMBER: X GOES FIRST</p>
                </div>
                <ButtonMultiplayer
                    value="NEW GAME VS PLAYER"
                    className={`${styles.gameMode} ${styles.newGameVsPlayer}`}
                    disabled={isDisabled}
                    onClick={(e) => {
                        e.preventDefault()
                        navigate("/game", { state: { gameMode: 'vsPlayer', pickIndex } });
                    }}
                />
                <ButtonCPU
                    classInput={styles.difficulty}
                    disabled={isDisabled}
                    onChange={(e) => {
                        e.preventDefault()
                        // setLevel(e.target.value)
                        levelRef.current = e.target.value
                        navigate("/game", { state: { gameMode: 'vsCPU', pickIndex, levelRef } })
                    }}
                    value={levelRef}
                />
            </form >
        </div >
    );
};

export default IntroView;