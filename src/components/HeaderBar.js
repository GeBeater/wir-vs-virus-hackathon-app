import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../assets/cofund.svg";
import {FAQ} from "../pages/FAQ";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {colors, spacing} from "../theme/theme";
import {Button} from "@material-ui/core";
import Help from "../assets/help-icon.svg";
import {Link} from "react-router-dom";
import {Imprint} from "../pages/Imprint";
import {Privacy} from "../pages/Privacy";

const useStyles = makeStyles(theme => ({
    appBar: {
        boxShadow: 'none'
    },
    toolBar: {
        backgroundColor: colors.grayA05,
        justifyContent: 'space-between'
    },
    buttonGroup: {
        display: 'flex'
    },
    button: {
        marginLeft: spacing.m,
        padding: '10px 15px',
        width: '100%'
    },
    buttonIcon: {
        marginRight: '8px'
    },
    buttonText: {
        color: colors.grayA50,
        fontFamily: 'Montserrat',
        fontWeight: '600'
    },
}));


export const HeaderBarItem = ({text, icon, handleClick}) => {
    const classes = useStyles();
    return (
        <Button className={classes.button} onClick={handleClick}>
            {!!icon && <img src={icon} className={classes.buttonIcon} alt="Help Icon" />}
            <span className={classes.buttonText}>{text}</span>
        </Button>
    )
};

export const HeaderBar = () => {
    const classes = useStyles();
    const [faqOpen, setFaqOpen] = React.useState(false);
    const [imprintOpen, setImprintOpen] = React.useState(false);
    const [privacyOpen, setPrivacyOpen] = React.useState(false);
    const toggleFaqOpen = () => setFaqOpen(!faqOpen);
    const toggleImprintOpen = () => setImprintOpen(!imprintOpen);
    const togglePrivacyOpen = () => setPrivacyOpen(!privacyOpen);

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <div className={classes.buttonGroup}>
                    <Link to={'/'} >
                        <img src={Logo} style={{width: 40, height: 40}} alt="CoFund Logo" />
                    </Link>
                </div>
                <div className={classes.buttonGroup}>
                    <HeaderBarItem text={'FAQ'} icon={Help} handleClick={toggleFaqOpen} />
                    <HeaderBarItem text={'Impressum'} handleClick={toggleImprintOpen} />
                    <HeaderBarItem text={'Datenschutz'} handleClick={togglePrivacyOpen} />
                </div>
            </Toolbar>
            <FAQ open={faqOpen} handleClose={toggleFaqOpen}/>
            <Imprint open={imprintOpen} handleClose={toggleImprintOpen}/>
            <Privacy open={privacyOpen} handleClose={togglePrivacyOpen} />
        </AppBar>
    )
}
