import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import GameModal from "../modals/Modals";
import ModalQuotes from '../modals/ModalQuotes';
import ModalRestart from '../modals/ModalRestart';
import Counter from './Counter';
import Button from './MainButton';
import { useNavigate } from 'react-router-dom';
import styles from "./game.module.css"

const arr = {
    empty: `${styles.grid}`,
    enterX: `${styles.grid} ${styles.enterX}`,
    enterZero: `${styles.grid} ${styles.enterZero}`,
    clickX: `${styles.grid} ${styles.clickedX}`,
    clickZero: `${styles.grid} ${styles.clickedZero}`,
    xWin: `${styles.grid} ${styles.xWin}`,
    zeroWin: `${styles.grid} ${styles.zeroWin}`
};

function getSessionStorage(key, defValue) {
    let result = sessionStorage.getItem(key);
    if (result === null) {
        return defValue;
    };
    return JSON.parse(result);
};

const Game = (src) => {
    const initialStatus = Array(9).fill(arr.empty);
    const [status, setStatus] = useState(initialStatus);
    const [score, setScore] = useState({ x: getSessionStorage("saveX", 0), ties: getSessionStorage("saveTies", 0), zero: getSessionStorage("saveZero", 0) });
    const [modalIndex, setModalIndex] = useState(5);
    const [excludeArray, setExcludeArray] = useState([]);
    const isInactiveRef = useRef(getSessionStorage("saveIsInactive", true))
    const nextMove = excludeArray.length;
    const navigate = useNavigate();
    const gameCount = score.x + score.zero + score.ties;
    const { state } = useLocation();
    const { pickIndex } = state || {}
    const { gameMode } = state || {}
    const { levelRef } = state || {}
    const nStat = status.slice();
    const cpuStoppedRef = useRef(false);
    const scenarious = useMemo(() => [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ], [])

    if (gameCount % 2 === 0) {
        nextMove % 2 === 0 ? src = "/starter-code/assets/icon-x-grey.svg" : src = "/starter-code/assets/icon-o-grey.svg";
    } else {
        nextMove % 2 === 1 ? src = "/starter-code/assets/icon-x-grey.svg" : src = "/starter-code/assets/icon-o-grey.svg";
    };

    const handleIn = (i) => {
        if ((gameMode === "vsCPU" && isInactiveRef.current) || nStat[i] === arr.zeroWin || nStat[i] === arr.xWin || nStat[i] === arr.clickX || nStat[i] === arr.clickZero) {
            return;
        };
        if (gameCount % 2 === 0) {
            nextMove % 2 === 0 ? nStat[i] = arr.enterX : nStat[i] = arr.enterZero;
        } else {
            nextMove % 2 === 1 ? nStat[i] = arr.enterX : nStat[i] = arr.enterZero;
        };
        setStatus(nStat);
    };

    const handleOut = (i) => {
        if ((gameMode === "vsCPU" && isInactiveRef.current) || nStat[i] === arr.zeroWin || nStat[i] === arr.xWin || nStat[i] === arr.clickX || nStat[i] === arr.clickZero) {
            return;
        };
        nStat[i] = arr.empty;
        setStatus(nStat);
    };

    const handleClick = (i) => {
        if ((gameMode === "vsCPU" && isInactiveRef.current) || nStat[i] === arr.zeroWin || nStat[i] === arr.xWin || nStat[i] === arr.clickX || nStat[i] === arr.clickZero) {
            return;
        };
        if (gameCount % 2 === 0) {
            nextMove % 2 === 0 ? nStat[i] = arr.clickX : nStat[i] = arr.clickZero;
        } else {
            nextMove % 2 === 1 ? nStat[i] = arr.clickX : nStat[i] = arr.clickZero;
        };
        isInactiveRef.current = true
        setStatus(nStat);
        handleWin(nStat);
        const newArr = [...excludeArray, i];
        setExcludeArray(newArr);
        cpuStoppedRef.current = false;
        console.log("arr from manual -> " + newArr);
        console.log("player made move -- " + nextMove);
    };

    const handleWin = useCallback((status) => {
        for (let item of scenarious) {
            const [A, B, C] = item;
            function win(input) {
                for (let item of [A, B, C]) {
                    status[item] = input;
                };
            };
            if (status[A] === arr.clickX && status[B] === status[A] && status[C] === status[A]) {
                const xWin = () => {
                    win(arr.xWin);
                    setScore({
                        ...score,
                        x: score.x + 1
                    });
                    setModalIndex(1)
                };
                return xWin();
            };
            if (status[A] === arr.clickZero && status[B] === status[A] && status[C] === status[A]) {
                const zeroWin = () => {
                    win(arr.zeroWin);
                    setScore({
                        ...score,
                        zero: score.zero + 1
                    });
                    setModalIndex(2)
                };
                return zeroWin();
            };
            if (nextMove === 8 && !status.includes(arr.xWin) && !status.includes(arr.zeroWin)) {
                const ties = () => {
                    setScore({
                        ...score,
                        ties: score.ties + 1
                    });
                    setModalIndex(3)
                };
                return ties()
            };
        };
    }, [nextMove, scenarious, score]);

    const handleNextRound = (e) => {
        e.preventDefault();
        setModalIndex(0);
        setStatus(initialStatus);
        setExcludeArray([]);
        if ((gameMode === "vsCPU" && pickIndex === "zero" && gameCount % 2 === 0) || (gameMode === "vsCPU" && pickIndex === "x" && gameCount % 2 === 1)) {
            isInactiveRef.current = true
        } else {
            isInactiveRef.current = false
        };
        cpuStoppedRef.current = false;
    };

    const handleIndexX = () => {
        if (gameMode === "vsPlayer") {
            return pickIndex === "x" ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!"
        };
        if (gameMode === "vsCPU") {
            return pickIndex === "x" ? "YOU WON!" : "OH NO, YOU LOST..."
        };
    };

    const handleIndexZero = () => {
        if (gameMode === "vsPlayer") {
            return pickIndex === "zero" ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!"
        };
        if (gameMode === "vsCPU") {
            return pickIndex === "zero" ? "YOU WON!" : "OH NO, YOU LOST..."
        };
    };

    const handleOpenRestart = (e) => {
        e.preventDefault();
        setModalIndex(4);
    };

    const handleSubmitRestart = (e) => {
        e.preventDefault();
        setModalIndex(0);
    };

    const handleCloseQuote = () => {
        setModalIndex(0)
    }

    // used for preserving scores when refreshing page
    useEffect(() => {
        sessionStorage.setItem("saveX", JSON.stringify(score.x));
        sessionStorage.setItem("saveZero", JSON.stringify(score.zero));
        sessionStorage.setItem("saveTies", JSON.stringify(score.ties));
        sessionStorage.setItem("saveIsInactive", JSON.stringify(isInactiveRef.current));
        if ((gameMode === "vsCPU" && pickIndex === "zero" && gameCount % 2 === 0) || (gameMode === "vsCPU" && pickIndex === "x" && gameCount % 2 === 1)) {
            isInactiveRef.current = true
        } else {
            isInactiveRef.current = false
        };

    }, [score, gameCount, pickIndex, gameMode]);

    // used for navigating back to the main page if user manually changes URL to get 
    // in to the game page without picking gameMode or mark
    useEffect(() => {
        if (!pickIndex || !gameMode) {
            navigate("/", { replace: true })
        }
    }, [pickIndex, gameMode, navigate]);



    // CPU actions---------------------

    const getRandomWithExclude = (input) => {
        const randNumber = Math.floor(Math.random() * (9 - input.length));
        return randNumber + input.sort((a, b) => a - b).reduce((acc, element) => {
            return randNumber >= element - acc ? acc + 1 : acc
        }, 0);
    };

    const cpuRandomClicker = useCallback((input) => {
        const result = getRandomWithExclude(excludeArray);
        nStat[result] = input;
        setStatus(nStat);
        handleWin(nStat);
        const newArr = [...excludeArray, result];
        setExcludeArray(newArr);
        console.log("arr from auto -> " + newArr);
        console.log("RANDOM CPU made move -- " + nextMove);
        isInactiveRef.current = false
        cpuStoppedRef.current = true;
    }, [excludeArray, handleWin, nStat, nextMove]);

    const handleCpuRandom = useCallback(() => {
        function click(inputA, inputB) {
            if (pickIndex === "x" && inputA && !cpuStoppedRef.current) {
                cpuRandomClicker(arr.clickZero);
            } else if (pickIndex === "zero" && inputB && !cpuStoppedRef.current) {
                cpuRandomClicker(arr.clickX);
            };
        };
        gameCount % 2 === 0 ? click(nextMove % 2 === 1, nextMove % 2 === 0) : click(nextMove % 2 === 0, nextMove % 2 === 1);
    }, [pickIndex, gameCount, cpuRandomClicker, nextMove]);

    const cpuActiveClicker = useCallback((input) => {
        function click(inputA, inputB) {
            if (pickIndex === "x" && inputA) {
                nStat[input] = arr.clickZero;
            } else if (pickIndex === "zero" && inputB) {
                nStat[input] = arr.clickX;
            };
        };
        if (!cpuStoppedRef.current) {
            gameCount % 2 === 0 ? click(nextMove % 2 === 1, nextMove % 2 === 0) : click(nextMove % 2 === 0, nextMove % 2 === 1);
            setStatus(nStat);
            handleWin(nStat);
            const newArr = [...excludeArray, input];
            setExcludeArray(newArr);
            isInactiveRef.current = false
            console.log("arr from auto -> " + newArr);
            console.log("ACTIVE CPU made move -- " + nextMove);
            cpuStoppedRef.current = true;
        };
    }, [excludeArray, gameCount, handleWin, pickIndex, nStat, nextMove]);

    const cpuActive = useCallback((a, b, c, manual, cpu) => {
        if ((nStat[a] === cpu && nStat[b] === cpu && nStat[c] !== manual)
            || (nStat[a] === cpu && nStat[c] === cpu && nStat[b] !== manual)
            || (nStat[b] === cpu && nStat[c] === cpu && nStat[a] !== manual)) {
            if (nStat[a] === cpu && nStat[b] === cpu) {
                return cpuActiveClicker(c);
            };
            if (nStat[a] === cpu && nStat[c] === cpu) {
                return cpuActiveClicker(b);
            };
            if (nStat[b] === cpu && nStat[c] === cpu) {
                return cpuActiveClicker(a);
            };
        };
    }, [cpuActiveClicker, nStat]);

    // used for running CPU actions
    useEffect(() => {
        const handleAttack = () => {
            for (let item of scenarious) {
                const [A, B, C] = item;
                pickIndex === "x" ? cpuActive(A, B, C, arr.clickX, arr.clickZero) : cpuActive(A, B, C, arr.clickZero, arr.clickX);
            };
        };

        const handleDefence = () => {
            for (let item of scenarious) {
                const [A, B, C] = item;
                pickIndex === "x" ? cpuActive(A, B, C, arr.clickZero, arr.clickX) : cpuActive(A, B, C, arr.clickX, arr.clickZero);
            };
        };

        let timer = setTimeout(() => {
            if (modalIndex === 0 && gameMode === "vsCPU" && !status.includes(arr.xWin) && !status.includes(arr.zeroWin) && excludeArray.length < 9) {
                if (levelRef.current === "beginner") {
                    return handleCpuRandom();
                };
                if (levelRef.current === "intermediate") {
                    const defence = () => {
                        handleDefence();
                        handleCpuRandom()
                    };
                    return defence();
                }
                if (levelRef.current === "advanced") {
                    const attack = () => {
                        handleAttack();
                        handleDefence();
                        handleCpuRandom()
                    };
                    return attack();
                };
            };
        }, 500)
        return () => clearTimeout(timer);
    }, [modalIndex, excludeArray, gameMode, handleCpuRandom, status, scenarious, pickIndex, cpuActive, levelRef]);

    // used for switching off modalQuotes component
    useEffect(() => {
        const timer = setTimeout(() => {
            if (modalIndex === 5) {
                setModalIndex(0)
            }
        }, 20000)
        return () => clearTimeout(timer);
    }, [modalIndex])

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.xZeroLogos}>
                    <img src="/starter-code/assets/logo.svg" alt="" />
                    {gameMode === "vsCPU" && <div className={styles.level}>{levelRef.current === "beginner" ? "Beginner" : levelRef.current === "intermediate" ? "Intermediate" : "Advanced"}</div>}
                </div>
                <div className={styles.turnDisplay}>
                    <img src={src} alt="" />
                    <span>TURN</span>
                </div>
                <form onSubmit={handleOpenRestart} className={styles.restart} action="" >
                    <button className={styles.restart}><img src="/starter-code/assets/icon-restart.svg" alt="" /></button>
                </form>
                {initialStatus.map((item, index) =>
                    <Button key={index} classTitle={status[index]} onClick={() => handleClick(index)} onEnter={() => handleIn(index)} onLeave={() => handleOut(index)} />
                )}
                <Counter classTitle={styles.xCounter} scoreX={score.x} />
                <Counter classTitle={styles.tiesCounter} scoreTies={score.ties} />
                <Counter classTitle={styles.zeroCounter} scoreZero={score.zero} />
            </div>
            {modalIndex === 1 && <GameModal
                nextRound={handleNextRound}
                mark="/starter-code/assets/icon-x.svg"
                textColor={styles.winnerTextX}
                handleIndex={handleIndexX()}
                roundTied={false}
            />}
            {modalIndex === 2 && <GameModal
                nextRound={handleNextRound}
                mark="/starter-code/assets/icon-o.svg"
                textColor={styles.winnerTextZero}
                handleIndex={handleIndexZero()}
                roundTied={false}
            />}
            {modalIndex === 3 && <GameModal
                nextRound={handleNextRound}
                textColor={styles.roundTiedText}
                roundTied={true}
            />}
            {modalIndex === 4 && <ModalRestart
                onShow={handleSubmitRestart}
            />}
            {modalIndex === 5 && <ModalQuotes onClick={handleCloseQuote} />}
        </>
    );
};

export default Game;