import React, { useId, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Stylesheets/intro.module.css';

function ButtonMultiplayer({ value, className, disabled, onClick, gameMode }) {
    return (
        <>
            <input
                className={className}
                type={'submit'}
                value={value}
                disabled={disabled}
                onClick={onClick}
            ></input>
        </>
    );
};

function ButtonCPU({ disabled, onChange, value }) {
    return (
        <div>
            <select className={styles.difficulty}
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
    )
}

function ButtonMark({ classInput, classLabel, markId, value, isActive, onClick }) {
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

export default function IntroView() {
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
                < ButtonMultiplayer
                    value="NEW GAME VS PLAYER"
                    className={`${styles.gameMode} ${styles.newGameVsPlayer}`}
                    disabled={isDisabled}
                    onClick={(e) => {
                        e.preventDefault()
                        navigate("/game", { state: { gameMode: 'vsPlayer', pickIndex } });
                    }}
                />
                <ButtonCPU
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
}