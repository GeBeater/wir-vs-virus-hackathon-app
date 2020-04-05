import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../assets/cofund.svg";
import FAQ from "../pages/FAQ";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {colors, spacing} from "../theme/theme";

const useStyles = makeStyles(theme => ({
    appBar: {
        boxShadow: 'none'
    },
    toolBar: {
        backgroundColor: colors.grayA05,
        justifyContent: 'space-between'
    },
}));

export default function HeaderBar(props) {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <div className="left">
                    <img src={Logo} style={{width: 40, height: 40}} alt="CoFund Logo" />
                </div>
                <div className="right">
                    <FAQ />
                </div>
            </Toolbar>
        </AppBar>
    )
}
