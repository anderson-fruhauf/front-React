import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function MenuLateral(props) {
    const classes = useStyles();
    const { open, onClose, onOpen } = props;


    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onKeyDown={onClose}
        >
            <List>
                <ListItem>
                    <ListItemText primary='Meu Aplicativo' />
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </ListItem>
            </List>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <SwipeableDrawer
                open={open}
                onClose={onClose}
                onOpen={onOpen}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );
}

MenuLateral.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
}