import {Button} from '@material-ui/core';
import React from 'react';
import styled from "styled-components";
import Logo from "../assets/cofund.svg";
import {colors} from "../theme/theme";
import Instagram from "../assets/instagram.svg";
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    icons: {
        margin: '0 8px'
    }
}));

export default function Success() {
    const shareUrl = 'https://cofund.de';
    const instagramUrl = 'https://instagram.com/cofund.de';
    const classes = useStyles();

    return (
        <Wrapper>
            <a href='/'>
                <img src={Logo} style={{width: 65, height: 65}} alt="CoFund Logo" />
            </a>
            <ContainerWrapper>
                <Container>
                    <header style={{gridArea: "header", marginBottom: "20px", textAlign: 'center'}}>
                        <h1>
                            Danke für deine Unterstützung!
                        </h1>
                        <div style={{color: colors.grayA50, textAlign: 'center'}}>
                            Die Unternehmen, die du ausgewählt hast, werden sofort von uns informiert.
                        </div>
                    </header>
                    <Button
                                href='/'
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Weiter unterstützen
                            </Button>
                    <div style={{marginTop: '100px'}}>
                        <h1>
                            Motiviere andere.
                        </h1>
                        <div>
                            <TwitterShareButton key={'tw'} className={'btn'} url={shareUrl} className={classes.icons}>
                                <TwitterIcon round size={32} />
                            </TwitterShareButton>
                            <FacebookShareButton key={'tw'} className={'btn'} url={shareUrl} className={classes.icons}>
                                <FacebookIcon round size={32} />
                            </FacebookShareButton>
                            <LinkedinShareButton key={'tw'} className={'btn'} url={shareUrl} className={classes.icons}>
                                <LinkedinIcon round size={32} />
                            </LinkedinShareButton>
                            <a href={instagramUrl} target="_blank">
                                <img src={Instagram} className={classes.icons} style={{width: 30, height: 30}} alt="Instagram Icon" />
                            </a>
                        </div>
                    </div>
                </Container>
            </ContainerWrapper>
        </Wrapper>
    )
}

const ContainerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 425px;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding-top: 120px;
    align-items: center;
    justify-content: center;
    max-width: 1000px;
    @media (max-width: 1200px) {
        margin: 0 15px;
        padding-top: 45px;
    }
`

const Container = styled.div`
    padding: 0 20px;
    margin-top: 20px;
    width: 100%;
    @media (max-width: 768px) {
        left: 5px;
        right: 5px;
        width: 100%;
    }
`
