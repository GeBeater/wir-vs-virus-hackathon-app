import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
    return (
        <Dialog
            open={true}
            onClose={props.handleDisagree}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {!!props.handleDisagree && (
                    <Button onClick={props.handleDisagree} color="primary">
                        {props.disagree}
                    </Button>
                )}
                <Button onClick={props.handleAgree} color="primary" autoFocus>
                    {props.agree}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
