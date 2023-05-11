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

    const handleXSelect = () => {
        setPickIndex('x');
        setIsDisabled(false);
    };

    const handleZeroSelect = () => {
        setPickIndex('zero');
        setIsDisabled(false);
    };

    const handleMultipSelect = (e) => {
        e.preventDefault();
        navigate("/game", { state: { gameMode: 'vsPlayer', pickIndex } });
    };

    const handleCpuSelect = (e) => {
        e.preventDefault();
        levelRef.current = e.target.value;
        navigate("/game", { state: { gameMode: 'vsCPU', pickIndex, levelRef } })
    };

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
                            onClick={handleXSelect}
                        />
                        <ButtonMark
                            classInput="P2"
                            value="zeroButton"
                            classLabel={styles.player2}
                            markId={id + 'zero'}
                            isActive={pickIndex === 'zero'}
                            onClick={handleZeroSelect}
                        />
                    </div>
                    <p>REMEMBER: X GOES FIRST</p>
                </div>
                <ButtonMultiplayer
                    className={`${styles.gameMode} ${styles.newGameVsPlayer}`}
                    disabled={isDisabled}
                    onClick={handleMultipSelect}
                />
                <ButtonCPU
                    classInput={styles.difficulty}
                    disabled={isDisabled}
                    onChange={handleCpuSelect}
                    value={levelRef}
                />
            </form >
        </div >
    );
};

export default IntroView;