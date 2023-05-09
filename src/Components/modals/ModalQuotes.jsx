import React, { useState, useEffect } from 'react';
import styles from "./modalMulti.module.css";
import axios from "axios";

const ModalQuotes = ({ onClick }) => {
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

export default ModalQuotes;