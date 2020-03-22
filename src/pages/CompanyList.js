import List from '@material-ui/core/List';
import {fade, makeStyles} from "@material-ui/core/styles";
import React, {useState} from 'react';
import {useAppContext, REMOVE_PLACE} from "../context/AppContext";
import {PlaceTile} from "./PlaceTile";

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    list: {
        width: '100%',
        maxWidth: '100%',
        overflowY: 'auto',
        padding: 3,
        overflowX: 'hidden'
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
    },
    placeholder: {
        height: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0',
        margin: '10px 0',
    }
}));

export default function CompanyList({showInputs = false}) {
    const [{_, places}, dispatch] = useAppContext();

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
    };

    const handleDeleteTile = value => () => {
        dispatch({type: REMOVE_PLACE, payload: value});
    };

    const hasPlaces = !!places.length;

    return (
        <List dense className={classes.list} style={{height: '100%'}}>
            {hasPlaces && places.map(place =>
                <PlaceTile
                    key={place.details.id}
                    place={place}
                    showCheckbox={true}
                    isChecked={checked.indexOf(place.place_id) !== -1}
                    handleToggle={handleToggle}
                    showDeleteBtn={true}
                    showInput={showInputs}
                    handleDelete={handleDeleteTile} />
            )}
            {!hasPlaces && (
                <div className={classes.placeholder}>
                    <span style={{color: '#ababab'}}>Kein Unternehmen ausgewählt</span>
                </div>
            )}
        </List>
    );
}
