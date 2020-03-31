import {Button} from '@material-ui/core';
import React from 'react';
import styled from "styled-components";
import Logo from "../assets/cofund.svg";
import {colors} from "../theme/theme";
import {useTranslation} from "react-i18next";

export default function PayoutSuccess() {
    const {t} = useTranslation();

    return (
        <Wrapper>
            <a href='/'>
                <img src={Logo} style={{width: 65, height: 65}} alt="CoFund Logo" />
            </a>
            <ContainerWrapper>
                <Container>
                    <header style={{gridArea: "header", marginBottom: "20px", textAlign: 'center'}}>
                        <h1>
                            Danke für dein Vertrauen!
                        </h1>
                        <div style={{color: colors.grayA50, textAlign: 'center'}}>
                            Deine Anfrage zur Auszahlung ist bei uns eingegangen und das Geld bald bei dir.
                        </div>
                    </header>
                    <Button
                        href='/'
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        {t('goback')}
                    </Button>
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
