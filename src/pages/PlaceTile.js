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
        borderBottom: '1px solid lightgrey',
        padding: '20px'
    },
    listheader: {
        color: 'grey',
        fontSize: '15px'
    },
    checkbox: {
        color : 'grey',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: fade(theme.palette.common.black, 0.05),
        }
    }
}));

export const PlaceTile = ({place, showDeleteBtn = false, handleDelete = null, showCheckbox = false, handleToggle = null, isChecked = false}) => {
    const classes = useStyles();
    const {name, place_id, icon, formatted_address} = place;
    const labelId = `checkbox-list-secondary-label-${place_id}`;

    return (
        <ListItem button className={classes.listitem}>
            <ListItemAvatar>
                <Avatar
                    variant='rounded'
                    alt={`Avatar n°${name + 1}`}
                    src={icon}
                />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={name} secondary={formatted_address} className={classes.listheader}/>
            <ListItemSecondaryAction>
                {showDeleteBtn && (<IconButton edge="end" aria-label="delete" onClick={handleDelete(place_id)}>
                    <CloseIcon />
                </IconButton>)}
            </ListItemSecondaryAction>
        </ListItem>
    );
};
