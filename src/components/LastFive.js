
import {List, ListItem, ListItemText, makeStyles} from '@material-ui/core';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles(theme => ({
    placeholder: {
        maxHeight: '250px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0',
    },
    title: {
        marginTop: '5px',
        marginLeft: '14px',
        marginBottom: '5px'
    },
    latest: {
        boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.1)",
        margin: "5px"
    },
    paper: {
        padding: 3,
        height: "100%",
        maxWidth: "100%",
        width: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse'
    },
    item: {
        padding: '10px 30px 10px 10px',
        boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 2
    }
}));

export default function LiveTicket() {
    const {t} = useTranslation();
    const classes = useStyles();
    const [transactions, setTransactions] = useState(null);
    const transactionsRef = useRef(transactions);

    useEffect(() => {
        fetchTicker()
    }, []);

    useEffect(() => {
        let eventSource = new EventSource("/api/transactions/feed");
        eventSource.onmessage = (e) => addTicker(JSON.parse(e.data))
        return () => {
            eventSource.close();
        }
    }, []);

    function addTicker(response) {
        updateTransactions([response, ...transactionsRef.current])
    }

    function fetchTicker() {
        return fetch('/api/transactions/history').then(r => r.json()).then(data => {
            updateTransactions(data.filter((a, i) => i < 7))
        }).catch(() => {});
    }

    function updateTransactions(data) {
        const filterDown = data.filter((a, i) => i < 20)
        transactionsRef.current = filterDown;
        setTransactions(filterDown);
    }

    return (
        <>
            {(transactions && transactions.length > 0) &&
                <>
                    <h3>{t('home.welcome.benext')}</h3>
                    <List className={classes.paper}>
                        {transactions.map((transaction, id) =>
                            <ListItem key={`transaction-${id}`} className={classes.item}>
                                <ListItemText
                                    secondary={`${transaction.amount}€ an ${transaction.company} in ${transaction.city}`}
                                />
                            </ListItem>,
                        )}
                    </List>
                </>
            }
            {(!transactions || transactions.length === 0) && (
                <div className={classes.placeholder}>
                    <span style={{color: '#ababab'}}>Noch nichts gespendet</span>
                </div>
            )}
        </>
    );
}
