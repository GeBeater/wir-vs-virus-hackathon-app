import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from 'react';
import styled from "styled-components";
import Help from "../assets/help-icon.svg";
import {colors, spacing} from "../theme/theme";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

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
                            <b>Was ist das Ziel?</b>
                            <br/>
                            <div>
                                In schweren Zeiten, wie diesen müssen wir als Gesellschaft zusammenhalten und denen helfen, die es besonders hart trifft. Das sind derzeit vor allem kleine Unternehmen und Geschäfte von nebenan, die mit massiven Umsatzeinbrüchen bis hin zu zwangsweisen Schließungen zu kämpfen haben. Deshalb ist es unser Ziel, kleinen Unternehmen von nebenan (unseren „Lieblingsläden“) zu helfen, indem wir ihnen schnelle Liquidität bereitstellen. Dadurch können sie die jetzige Krise überstehen und Arbeitsplätze bleiben erhalten.
                            </div>
                        </div>
                        <br/>
                        <div style={{lineHeight: '22px'}}>
                            <b>Wie funktioniert das System?</b>
                            <br/>
                            <div>
                            Ganz einfach: Ihr sucht auf der Karte die Unternehmen und Läden aus, denen ihr sofortige Hilfe zukommen lassen wollt. Ihr könnt entweder einen Geldbetrag spenden oder Gutscheine erwerben, die zu einem späteren Zeitpunkt eingelöst werden können. Der Betrag wird per PayPal an uns überwiesen und wir sorgen dafür, dass das Geld schnellstmöglich bei den Unternehmen ankommt, die es jetzt so dringend benötigen.
                            </div>
                        </div>
                        <br/>
                        <div style={{lineHeight: '22px'}}>
                            <b>Was passiert, wenn die Unternehmen die Hilfe nicht annehmen?</b>
                            <br/>
                            <div>
                            Für den unwahrscheinlichen Fall, dass die Unternehmen die Hilfe nicht annehmen möchten oder können, werden wir euch selbstverständlich eure Geldbeträge sofort per PayPal zurückerstatten. Wir führen intern über alle Transaktionen Buch und ihr erhaltet nach eurer Spende oder dem Erwerb eines Gutscheins sofort eine Bestätigung mit Beleg per E-Mail.
                            </div>
                        </div>
                        <br/>
                        <div style={{lineHeight: '22px'}}>
                            <b>Wann kann ich die Gutscheine einlösen?</b>
                            <br/>
                            <div>
                            Das entscheiden die Unternehmen selbst. Aber bitte geht davon aus, dass insbesondere Restaurants, Bars, Cafés oder andere Geschäfte, die derzeit zwangsweise geschlossen sind, erst nach überstandener Krise wieder ihre Leistungen und Waren anbieten können. 
                            </div>
                        </div>
                        <br/>
                        <div style={{lineHeight: '22px'}}>
                            <b>Wie kann ich helfen?</b>
                            <br/>
                            <div>
                            Derzeit ist es für die kleinen Unternehmen am wichtigsten, die nötige Liquidität zu erhalten, um zu überleben. Ihr könnt mithelfen, indem ihr eure Familie, Freunde und Bekannte auf unser Projekt aufmerksam macht und bittet, ebenfalls teilzunehmen.
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Close
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