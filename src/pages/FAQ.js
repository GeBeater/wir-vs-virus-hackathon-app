import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {useTranslation} from 'react-i18next';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    faqItem: {
        marginBottom: theme.spacing(2)
    }
}));

const FaqItem = ({headline, text}) => {
    const classes = useStyles();

    return (
        <div className={classes.faqItem}>
            <Typography variant={"body1"} gutterBottom={true}><b>{headline}</b></Typography>
            <Typography variant={"body1"} gutterBottom={true}>{text}</Typography>
        </div>
    )
};


export const FAQ = ({open, handleClose}) => {
    const {t} = useTranslation();

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth={'md'}>
            <DialogContent dividers>
                <b>FAQ</b>
            </DialogContent>
            <DialogContent dividers>
                <FaqItem headline={t('faq.who.headline')} text={t('faq.who.text')} />
                <FaqItem headline={t('faq.what.headline')} text={t('faq.what.text')} />
                <FaqItem headline={t('faq.how.headline')} text={t('faq.how.text')} />
                <FaqItem headline={t('faq.decline.headline')} text={t('faq.decline.text')} />
                <FaqItem headline={t('faq.goodie.headline')} text={t('faq.goodie.text')} />
                <FaqItem headline={t('faq.help.headline')} text={t('faq.help.text')} />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    {t('close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
