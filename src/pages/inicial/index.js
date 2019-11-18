import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';
import CustomAppBar from '../../components/appBar'
import MenuLateral from '../../components/menuLateral'
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { logout } from "../../services/auth";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { Button, TextField } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import api from "../../services/api";
import Grid from '@material-ui/core/Grid';

import { Alert } from '../../components/alert'

function Inicial() {
    const classes = useStyles();

    const [alertState, setAlertState] = React.useState({
        open: false,
        variant: 'success',
        message: ""
    })

    const [state, setState] = React.useState({
        nome: '',
        funcao: ''
    })

    const [funcionarioState, setFuncionarioState] = React.useState([])

    React.useEffect(async () => {
        const response = await api.get("/funcionarios");
        console.log(response.data)
        setFuncionarioState(response.data);
    }, [])

    const [redirectState, setRedirectState] = React.useState({
        path: '',
        redirect: false
    })

    const [menuState, setMenuState] = React.useState(false)

    function handleClose() {
        setAlertState({ ...alertState, open: false })
    }

    function openMenu() {
        setMenuState(true)
    }

    function closeMenu() {
        setMenuState(false)
    }

    function onLogout() {
        logout()
        setRedirectState({
            path: '/',
            redirect: true
        })
    }

    async function cadastrar() {
        if (!state.nome || !state.funcao) {
            setAlertState({ variant: 'error', message: 'Preencha as informações para proceguir', open: true })
            return;
        }

        try {
            await api.post("/funcionarios", state)

            const response = await api.get("/funcionarios");
            setFuncionarioState(response.data);

            setAlertState({ variant: 'success', message: 'Cadastro concluido', open: true })
        } catch (err) {
            setAlertState({ variant: 'error', message: 'Falha ao cadastrar funcionario, tente novamente mais tarde', open: true })
        }

    }



    return (
        <div>
            {redirectState.redirect ? <Redirect to={redirectState.path} /> : null}
            <Alert
                open={alertState.open}
                onClose={handleClose}
                variant={alertState.variant}
                message={alertState.message}

            />
            <CustomAppBar
                title='titulo'
                buttonRigthLabel='sair'
                buttonRigthClick={onLogout}
                butonLeftClick={openMenu}
            />
            <MenuLateral
                open={menuState}
                onClose={closeMenu}
            />
            <Container maxWidth='md' className={classes.container}>
                <h2 className={classes.h2}>
                    Funcionarios
                </h2>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="nome"
                    label="nome"
                    id="nome"
                    onChange={(e) => { setState({ ...state, nome: e.target.value }) }}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="funcao"
                    id="funcao"
                    label="função"
                    onChange={(e) => { setState({ ...state, funcao: e.target.value }) }}
                />
                <Button variant="contained" color="primary" className={classes.button} onClick={cadastrar}>
                    Cadastrar
                </Button>

            </Container>

            <Container maxWidth='lg'>
                <Tabela
                    className={classes.tabela}
                    lista={funcionarioState}
                />
            </Container>



        </div>
    );
}

const useStyles = makeStyles(theme => ({
    container: {
        textAlign: 'center',
        marginTop: 30,
    },
    h2: {
        color: grey[700],
    },
    tabela: {
        marginTop: 65,
    },
    button: {
        alignSelf: 'rigth',
        margin: 5,
        float: 'right'
    }
}));


function Tabela(props) {
    const { lista } = props
    return (
        <Table stickyHeader aria-label="sticky table" {...props}>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Código
                    </TableCell>

                    <TableCell>
                        Nome
                    </TableCell>

                    <TableCell>
                        Função
                    </TableCell>


                </TableRow>
            </TableHead>
            <TableBody>
                {lista.map((func) => {
                    return (
                        <RowTable
                            id={func.id}
                            nome={func.nome}
                            funcao={func.funcao}
                        />
                    )
                })}
            </TableBody>
        </Table>
    )
}

function RowTable(props) {
    const { id, nome, funcao } = props;

    return (
        <TableRow hover role="checkbox">
            <TableCell >
                {id}
            </TableCell>
            <TableCell >
                {nome}
            </TableCell>
            <TableCell >
                {funcao}
            </TableCell>
        </TableRow>
    )

}

export default withRouter(Inicial);