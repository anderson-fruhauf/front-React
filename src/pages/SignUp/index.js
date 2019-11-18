import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import Logo from "../../assets/airbnb-logo.svg";
import api from "../../services/api";
import { login } from "../../services/auth";
import { Button, TextField } from '@material-ui/core';

import { Alert } from '../../components/alert'

import { Form, Container } from "./styles";


function SignUp() {

    const [state, setState] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        redirect: false
    })

    const [alertState, setAlertState] = React.useState({
        variant: 'error',
        mensage: "",
        alertOpen: false
    })

    const handleSignUp = async () => {
        const { username, email, password, confirmPassword } = state;

        if (!email || !password || !username || !confirmPassword) {
            setAlertState({ variant: 'error', mensage: "Preencha todos os dados para continuar!", alertOpen: true });
            return;
        }

        if (password !== confirmPassword) {
            setAlertState({ variant: 'error', mensage: "Senhas não conferem, por favor verifique!", alertOpen: true });
            return;
        }

        if (email.indexOf('@') < 0 || email.indexOf('.') < 0) {
            setAlertState({ variant: 'error', mensage: "Infome um email valido", alertOpen: true });
            return;
        }


        try {
            const response = await api.post("/register", { username, email, password });
            console.log(response.data)
            if (response.data.username) {
                setAlertState({ variant: 'success', mensage: "Registro realizado com sucesso", alertOpen: true });
                setTimeout(() => {
                    setState({ ...state, redirect: true })
                }, 3000)

            }
        } catch (err) {
            console.error(err)

            setAlertState({
                variant: 'error',
                alertOpen: true,
                mensage:
                    "Houve um problema com o login, verifique suas credenciais. T.T"
            });
        }

    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertState({ variant: 'error', mensage: "", alertOpen: false });
    };

    return (
        <Container>
            {state.redirect ? <Redirect to='/' /> : null}

            <Alert
                open={alertState.alertOpen}
                onClose={handleClose}
                variant={alertState.variant}
                message={alertState.mensage}
            />
            <Form>
                <img src={Logo} alt="Airbnb logo" />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="user"
                    label="Usuario"
                    name="user"
                    onChange={(e) => { setState({ ...state, username: e.target.value }) }}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => { setState({ ...state, email: e.target.value }) }}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => { setState({ ...state, password: e.target.value }) }}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Confimação de Senha"
                    type="password"
                    id="ConfirmPassword"
                    onChange={(e) => { setState({ ...state, confirmPassword: e.target.value }) }}
                />

                <Button variant="contained" color="primary" onClick={handleSignUp}>
                    Cadastrar
                 </Button>

                <hr />
                <Link to="/">Logar</Link>
            </Form>
        </Container >
    );

}

export default withRouter(SignUp);
