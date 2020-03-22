import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    listitem: {
        padding: '10px 20px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        marginBottom: 10
    },
    itemText: {
        color: 'grey',
        fontSize: '15px',
        paddingRight: 12
    },
    checkbox: {
        color : 'grey',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: fade(theme.palette.common.black, 0.05),
        }
    },
    secondaryAction: {
        top: 20,
        right: 8
    }
}));

export const PlaceTile = ({place, showDeleteBtn = false, handleDelete = null, showCheckbox = false, handleToggle = null, isChecked = false}) => {
    const classes = useStyles();
    const {name, place_id, icon, formatted_address} = place;
    const labelId = `checkbox-list-secondary-label-${place_id}`;

    return (
        <ListItem button className={classes.listitem} boxShadow={0}>
            <ListItemAvatar>
                <Avatar
                    variant='rounded'
                    alt={`Avatar n°${name + 1}`}
                    src={icon}
                />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={name} secondary={formatted_address} className={classes.itemText}/>
            <ListItemSecondaryAction className={classes.secondaryAction}>
                {showDeleteBtn && (<IconButton edge="end" aria-label="delete" onClick={handleDelete(place_id)}>
                    <CloseIcon />
                </IconButton>)}
            </ListItemSecondaryAction>
        </ListItem>
    );
};
