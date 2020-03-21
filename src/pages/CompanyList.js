import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {fade, makeStyles} from "@material-ui/core/styles";
import React, {useState} from 'react';
import {useAppContext} from "../context/AppContext";
const useStyles = makeStyles(theme => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    list: {
        width: '100%',
        maxWidth: 1000,
    },
    listitem: {
        borderBottom: '1px solid lightgrey',
        padding: '20px'
    },
    listheader: {
        color: 'grey',
        fontSize: '15px'
    },
    checkbox: {
        color: 'grey',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: fade(theme.palette.common.black, 0.05),
        }
    }
}));

export default function CompanyList() {
    const [{_, places}] = useAppContext();

    const classes = useStyles();
    const [checked, setChecked] = useState([1]);


    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    }

    return (
        <List dense className={classes.list}>
            {places.map(value => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                    <ListItem key={value} button className={classes.listitem}>
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar n°${value + 1}`}
                                src={value.icon}
                            />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={`${value.name}`} className={classes.listheader} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(value)}
                                checked={checked.indexOf(value) !== -1}
                                inputProps={{'aria-labelledby': labelId}}
                                className={classes.checkbox}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}