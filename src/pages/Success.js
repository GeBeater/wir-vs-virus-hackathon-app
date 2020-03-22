import {Button} from '@material-ui/core';
import React from 'react';
import styled from "styled-components";
import Logo from "../assets/cofund.svg";
import {colors, spacing} from "../theme/theme";
import Twitter from "../assets/twitter.svg";
import Facebook from "../assets/facebook.svg";
import Instagram from "../assets/instagram.svg";

export default function Success() {

    return (
        <Wrapper>
            <img src={Logo} style={{width: 65, height: 65}} alt="CoFund Logo" />
            <ConatinerWrapper>
                <Container>
                    <header style={{gridArea: "header", textAlign: "left", marginBottom: "20px", textAlign: 'center'}}>
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
                        <div style={{paddingLeft: '20px'}}>
                            <img src={Twitter} style={{width: 30, height: 30, marginRight: '30px'}} alt="Help Icon" />
                            <img src={Instagram} style={{width: 30, height: 30, marginRight: '30px'}} alt="Help Icon" />
                            <img src={Facebook} style={{width: 30, height: 30, marginRight: '30px'}} alt="Help Icon" />
                        </div>
                    </div>
                </Container>
            </ConatinerWrapper>
        </Wrapper>
    )
}

const ConatinerWrapper = styled.div`
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