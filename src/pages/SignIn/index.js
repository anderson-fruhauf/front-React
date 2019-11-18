import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import Logo from "../../assets/airbnb-logo.svg";
import api from "../../services/api";
import { login } from "../../services/auth";
import { Button, TextField } from '@material-ui/core';

import { Alert } from '../../components/alert'

import { Form, Container } from "./styles";


function SignIn() {

  const [state, setState] = React.useState({
    email: "",
    password: "",
    error: "",
    alertOpen: false,
    redirect: false,
  })

  const handleSignIn = async () => {
    const { email, password } = state;
    console.table(email, password);

    if (!email || !password) {
      setState({ ...state, error: "Preencha e-mail e senha para continuar!", alertOpen: true });
    } else {
      try {
        const response = await api.post("/autenticate", { email, password });
        login(response.data.token);
        setState({ ...state, redirect: true })
        console.log('logou ==> token = ' + response.data.token);
      } catch (err) {
        //alert("Houve um problema com o login, verifique suas credenciais. T.T")
        setState({
          ...state,
          alertOpen: true,
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({ ...state, alertOpen: false });
  };

  return (
    <Container>

      {state.redirect ? <Redirect to='/home' /> : null}

      <Alert
        open={state.alertOpen}
        onClose={handleClose}
        variant="error"
        message={state.error}
      />
      <Form>
        <img src={Logo} alt="Airbnb logo" />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
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
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => { setState({ ...state, password: e.target.value }) }}
        />

        <Button variant="contained" color="primary" onClick={handleSignIn}>
          Entrar
          </Button>

        <hr />
        <Link to="/signup">Criar conta grátis</Link>
      </Form>
    </Container >
  );

}

export default withRouter(SignIn);
