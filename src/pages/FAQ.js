import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from 'react';
import styled from "styled-components";
import Help from "../assets/help-icon.svg";
import {colors, spacing} from "../theme/theme";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: 3
    },
    toolbar: {
        backgroundColor: colors.white,
    },
    paper: {
        width: "25%",
        padding: spacing.l,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    list: {
        width: '100%',
    },
    faq: {
        color: colors.grayA50,
        fontFamily: 'Montserrat',
        fontWeight: '600'
    },
    notificationWrapper: {
        position: 'absolute',
        width: '100%',
        top: 0,
        padding: 10
    },
    notification: {
        boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.1)',
    }
}));

export default function Home() {
    const {t} = useTranslation();
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <Container>
            <Button style={{marginLeft: spacing.s, padding: '10px 15px', width: '100%'}} onClick={handleClickOpen}>
                <img src={Help} style={{marginRight: '8px'}} alt="Help Icon" />
                <span className={classes.faq}>FAQ</span>
                </Button>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogContent dividers style={{overflowY: 'hidden'}}>
                        <b>FAQ</b>
                    </DialogContent>
                    <DialogContent dividers>
                        <div style={{lineHeight: '22px'}}>
                            <b>{t('faq.who.headline')}</b>
                            <br/>
                            <div>
                                {t('faq.who.text')}
                            </div>
                        </div>
                        <br/>
                        <div style={{lineHeight: '22px'}}>
                            <b>{t('faq.what.headline')}</b>
                            <br/>
                            <div>
                                {t('faq.what.text')}
                            </div>
                        </div>
                        <br/>
                        <div style={{lineHeight: '22px'}}>
                            <b>{t('faq.how.headline')}</b>
                            <br/>
                            <div>
                                {t('faq.how.text')}
                            </div>
                        </div>
                        <br/>
                        <div style={{lineHeight: '22px'}}>
                            <b>{t('faq.decline.headline')}</b>
                            <br/>
                            <div>
                                {t('faq.decline.text')}
                            </div>
                        </div>
                        <br/>
                        <div style={{lineHeight: '22px'}}>
                            <b>{t('faq.goodie.headline')}</b>
                            <br/>
                            <div>
                                {t('faq.goodie.text')}
                            </div>
                        </div>
                        <br/>
                        <div style={{lineHeight: '22px'}}>
                            <b>{t('faq.help.headline')}</b>
                            <br/>
                            <div>
                                {t('faq.help.text')}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                        {t('close')}
                        </Button>
                    </DialogActions>
                </Dialog>
        </Container>
    );
}

const Container = styled.div`
    width: 80px;
    display: flex;
    height: 100%;
    flex-direction: column;
`;