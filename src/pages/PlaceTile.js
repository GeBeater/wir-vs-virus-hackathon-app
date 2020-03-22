import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import React from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import {UPDATE_PLACE, UPDATE_PLACES, useAppContext} from "../context/AppContext";

const useStyles = makeStyles(theme => ({
    listitem: {
        padding: '10px 40px 10px 10px',
        boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 2
    },
    itemText: {
        color: 'grey',
        fontSize: '15px'
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
    },
    avatar: {
        minWidth: 66,
    },
    avatarImg: {
        width: 56,
        height: 56
    },
    amountTf: {
        maxWidth: 120
    }
}));

export const PlaceTile = ({place, showDeleteBtn = false, handleDelete = null, showInput = false}) => {
    const classes = useStyles();
    const {name, place_id, icon, address_components, photos} = place.details;
    const labelId = `checkbox-list-secondary-label-${place_id}`;
    const imgSrc = photos && photos.length ? photos[0].getUrl({maxWidth: 100, maxHeight: 100}) : icon;
    const [_, dispatch] = useAppContext();

    const getShortAddress = (comps) => {
        const route = address_components
            .filter(cmp => cmp.types && cmp.types.indexOf('route') >= 0)
            .map(cmp => cmp.short_name);
        const streetNumber = address_components
            .filter(cmp => cmp.types && cmp.types.indexOf('street_number') >= 0)
            .map(cmp => cmp.short_name);

        return `${route} ${streetNumber}`;
    };

    const handleChangeAmount = (evt) => {
        dispatch({type: UPDATE_PLACE, payload: {details: place.details, amount: evt.target.value}});
    };

    return (
        <ListItem button className={classes.listitem}>
            <ListItemAvatar className={classes.avatar}>
                <Avatar
                    variant='circle'
                    alt={name}
                    src={imgSrc}
                    className={classes.avatarImg}
                />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={name} secondary={getShortAddress(address_components)} className={classes.itemText}/>
            {showInput && (
                <TextField
                    variant="outlined"
                    name="donation"
                    type="number"
                    value={parseFloat(place.amount)}
                    onChange={handleChangeAmount}
                    className={classes.amountTf}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                    }}
                />)
            }
            <ListItemSecondaryAction className={classes.secondaryAction}>
                {showDeleteBtn && (<IconButton edge="end" aria-label="delete" onClick={handleDelete(place_id)}>
                    <CloseIcon />
                </IconButton>)}
            </ListItemSecondaryAction>
        </ListItem>
    );
};
