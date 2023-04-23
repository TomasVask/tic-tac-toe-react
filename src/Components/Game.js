import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import { ModalXWin, ModalZeroWin, ModalRestart, ModalTies, ModalQuotes } from "./Modals";
import { useNavigate } from 'react-router-dom';
import styles from "../Stylesheets/game.module.css"

const arr = {
    empty: `${styles.grid}`,
    enterX: `${styles.grid} ${styles.enterX}`,
    enterZero: `${styles.grid} ${styles.enterZero}`,
    clickX: `${styles.grid} ${styles.clickedX}`,
    clickZero: `${styles.grid} ${styles.clickedZero}`,
    xWin: `${styles.grid} ${styles.xWin}`,
    zeroWin: `${styles.grid} ${styles.zeroWin}`
};

function Button({ onClick, onEnter, onLeave, classTitle }) {
    return (
        <button
            className={classTitle}
            onPointerEnter={onEnter}
            onPointerLeave={onLeave}
            onClick={onClick}
        ></button>
    )
};

function getSessionStorage(key, defValue) {
    let result = sessionStorage.getItem(key);
    if (result === null) {
        return defValue;
    };
    return JSON.parse(result);
};

function Counter({ classTitle, scoreX, scoreZero, scoreTies }) {
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
    )
};

export default function Board(src) {
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

    function handleIn(i) {
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

    function handleOut(i) {
        if ((gameMode === "vsCPU" && isInactiveRef.current) || nStat[i] === arr.zeroWin || nStat[i] === arr.xWin || nStat[i] === arr.clickX || nStat[i] === arr.clickZero) {
            return;
        };
        nStat[i] = arr.empty;
        setStatus(nStat);
    };

    function handleClick(i) {
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
                win(arr.xWin);
                setScore({
                    ...score,
                    x: score.x + 1
                });
                setModalIndex(1);
            } else if (status[A] === arr.clickZero && status[B] === status[A] && status[C] === status[A]) {
                win(arr.zeroWin);
                setScore({
                    ...score,
                    zero: score.zero + 1
                });
                setModalIndex(2);
            } else if (nextMove === 8 && !status.includes(arr.xWin) && !status.includes(arr.zeroWin)) {
                setScore({
                    ...score,
                    ties: score.ties + 1
                });
                setModalIndex(3);
            };
        };
    }, [nextMove, scenarious, score]);

    function handleQuit(e) {
        e.preventDefault();
        navigate("/");
        sessionStorage.clear();
    };

    function handleNextRound(e) {
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

    function getRandomWithExclude(input) {
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
                cpuActiveClicker(c);
            } else if (nStat[a] === cpu && nStat[c] === cpu) {
                cpuActiveClicker(b);
            } else if (nStat[b] === cpu && nStat[c] === cpu) {
                cpuActiveClicker(a);
            };
        };
    }, [cpuActiveClicker, nStat]);

    // used for running CPU actions
    useEffect(() => {
        function handleAttack() {
            for (let item of scenarious) {
                const [A, B, C] = item;
                pickIndex === "x" ? cpuActive(A, B, C, arr.clickX, arr.clickZero) : cpuActive(A, B, C, arr.clickZero, arr.clickX);
            };
        };

        function handleDefence() {
            for (let item of scenarious) {
                const [A, B, C] = item;
                pickIndex === "x" ? cpuActive(A, B, C, arr.clickZero, arr.clickX) : cpuActive(A, B, C, arr.clickX, arr.clickZero);
            };
        };

        let timer = setTimeout(() => {
            if (modalIndex === 0 && gameMode === "vsCPU" && !status.includes(arr.xWin) && !status.includes(arr.zeroWin) && excludeArray.length < 9) {
                if (levelRef.current === "beginner") {
                    handleCpuRandom();
                } else if (levelRef.current === "intermediate") {
                    handleDefence();
                    handleCpuRandom();
                } else if (levelRef.current === "advanced") {
                    handleAttack();
                    handleDefence();
                    handleCpuRandom();
                };
            };
        }, 500)
        return () => clearTimeout(timer);
    }, [modalIndex, excludeArray, gameMode, handleCpuRandom, status, scenarious, pickIndex, cpuActive, levelRef]);

    // used for switching off modalQuotes
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
                </div>
                <div className={styles.turnDisplay}>
                    <img src={src} alt="" />
                    <span>TURN</span>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setModalIndex(4) }} className={styles.restart} action="" >
                    <button className={styles.restart}><img src="/starter-code/assets/icon-restart.svg" alt="" /></button>
                </form>
                <Button classTitle={status[0]} onClick={() => handleClick(0)} onEnter={() => handleIn(0)} onLeave={() => handleOut(0)} />
                <Button classTitle={status[1]} onClick={() => handleClick(1)} onEnter={() => handleIn(1)} onLeave={() => handleOut(1)} />
                <Button classTitle={status[2]} onClick={() => handleClick(2)} onEnter={() => handleIn(2)} onLeave={() => handleOut(2)} />
                <Button classTitle={status[3]} onClick={() => handleClick(3)} onEnter={() => handleIn(3)} onLeave={() => handleOut(3)} />
                <Button classTitle={status[4]} onClick={() => handleClick(4)} onEnter={() => handleIn(4)} onLeave={() => handleOut(4)} />
                <Button classTitle={status[5]} onClick={() => handleClick(5)} onEnter={() => handleIn(5)} onLeave={() => handleOut(5)} />
                <Button classTitle={status[6]} onClick={() => handleClick(6)} onEnter={() => handleIn(6)} onLeave={() => handleOut(6)} />
                <Button classTitle={status[7]} onClick={() => handleClick(7)} onEnter={() => handleIn(7)} onLeave={() => handleOut(7)} />
                <Button classTitle={status[8]} onClick={() => handleClick(8)} onEnter={() => handleIn(8)} onLeave={() => handleOut(8)} />
                <Counter classTitle={styles.xCounter} scoreX={score.x} />
                <Counter classTitle={styles.tiesCounter} scoreTies={score.ties} />
                <Counter classTitle={styles.zeroCounter} scoreZero={score.zero} />
            </div>
            {modalIndex === 1 && <ModalXWin onGameEnd={handleQuit} nextRound={handleNextRound} />}
            {modalIndex === 2 && <ModalZeroWin onGameEnd={handleQuit} nextRound={handleNextRound} />}
            {modalIndex === 3 && <ModalTies onGameEnd={handleQuit} nextRound={handleNextRound} />}
            {modalIndex === 4 && <ModalRestart onGameEnd={handleQuit} onShow={(e) => { e.preventDefault(); setModalIndex(0) }} />}
            {modalIndex === 5 && <ModalQuotes onClick={() => setModalIndex(0)} />}
        </>
    );
};