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
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
        padding: '10px 15px',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: spacing.m,
        }
    },
    buttonIcon: {
        marginRight: '8px'
    },
    buttonText: {
        color: colors.grayA50,
        fontFamily: 'Montserrat',
        fontWeight: '600'
    },
    mobileMenuIcon: {
        color: colors.black
    },
    drawerPaper: {
        width: 'calc(100% - 70px)'
    }
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
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const toggleFaqOpen = () => {
        setMobileOpen(false);
        setFaqOpen(!faqOpen);
    };
    const toggleImprintOpen = () => {
        setMobileOpen(false);
        setImprintOpen(!imprintOpen);
    };
    const togglePrivacyOpen = () => {
        setMobileOpen(false);
        setPrivacyOpen(!privacyOpen);
    };
    const toggleMobileOpen = () => setMobileOpen(!mobileOpen);

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <div className={classes.buttonGroup}>
                    <Link to={'/'} >
                        <img src={Logo} style={{width: 40, height: 40}} alt="CoFund Logo" />
                    </Link>
                </div>
                <div className={classes.buttonGroup}>
                    {/* mobile burger icon */}
                    <Hidden smUp implementation="js">
                        <MenuIcon onClick={toggleMobileOpen} className={classes.mobileMenuIcon} />
                    </Hidden>
                    {/* desktop nav items */}
                    <Hidden xsDown implementation="js">
                        <HeaderBarItem text={'FAQ'} icon={Help} handleClick={toggleFaqOpen} />
                        <HeaderBarItem text={'Impressum'} handleClick={toggleImprintOpen} />
                        <HeaderBarItem text={'Datenschutz'} handleClick={togglePrivacyOpen} />
                    </Hidden>
                </div>
            </Toolbar>
            {/* mobile navigation */}
            <Drawer
                variant="temporary"
                anchor={'right'}
                open={mobileOpen}
                onClose={toggleMobileOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <List>
                    <ListItem key={'faq'} onClick={toggleFaqOpen}>
                        <ListItemText primary={'FAQ'} />
                    </ListItem>
                    <ListItem key={'Impressum'} onClick={toggleImprintOpen}>
                        <ListItemText primary={'Impressum'} />
                    </ListItem>
                    <ListItem key={'Datenschutz'} onClick={togglePrivacyOpen}>
                        <ListItemText primary={'Datenschutz'} />
                    </ListItem>
                </List>
            </Drawer>
            <FAQ open={faqOpen} handleClose={toggleFaqOpen}/>
            <Imprint open={imprintOpen} handleClose={toggleImprintOpen}/>
            <Privacy open={privacyOpen} handleClose={togglePrivacyOpen} />
        </AppBar>
    )
}
