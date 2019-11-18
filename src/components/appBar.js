import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function CustomAppBar(props) {
    const classes = useStyles();

    const { title, butonLeftClick, buttonRigthClick, buttonRigthLabel } = props

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={butonLeftClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <Button color="inherit" onClick={buttonRigthClick}>{buttonRigthLabel}</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}


CustomAppBar.propTypes = {
    title: PropTypes.string.isRequired,
    buttonRigthLabel: PropTypes.string.isRequired,
    butonLeftClick: PropTypes.func,
    buttonRigthClick: PropTypes.func,
}