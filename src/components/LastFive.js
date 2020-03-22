
import {List, ListItem, ListItemText, makeStyles, Paper, Typography} from '@material-ui/core';
import React, {useEffect, useState} from 'react';

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
        padding: 0,
        height: "100%"
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
    const classes = useStyles();
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        fetchTicker()
    }, []);

    function fetchTicker() {
        fetch('/api/transactions/history').then(r => r.json()).then(data => {
            setTransactions(data.filter((a,i) => i < 3));
        });
    }
    return (
        <>
            {(transactions && transactions.length > 0) &&
                <>
                    <List className={classes.paper}>
                        {transactions.map(transaction =>
                            <ListItem className={classes.item}>
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
