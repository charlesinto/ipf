import React, { Component } from 'react';
import { ListItem, ListItemIcon, ListItemText, List, withStyles, Paper } from '@material-ui/core';
import InboxIcon from "@material-ui/icons/Inbox";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import PaymentCard from '@material-ui/icons/CardMembership';
import PaymentHistory from '@material-ui/icons/History';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import * as actions from "../redux/actions";
import { Link } from 'react-router-dom';

class SideBar extends Component {

    handleLinkChange = (link) => {
        if(link === 'dashboard'){
            this.props.setActiveLink('dashboard')
        }
        if(link === 'profile'){
            this.props.setActiveLink('profile')
        }
        if(link === 'event'){
            this.props.setActiveLink('event')
        }
        if(link === 'payment'){
            this.props.setActiveLink('payment')
            // this.props.history.push('/user/membership-payment')
        }
        if( link === 'notification'){
            this.props.setActiveLink('notification')
        }
    }
  render() {
    const { classes,activeLink } = this.props;
    
    return (
      <>
        <List component="nav" className={classes.navBar} aria-label="main mailbox folders">
            <Paper onClick={() => this.handleLinkChange('dashboard')} className={classes.listIconButton} elevation={0}>
                <ListItem component={Link} to="/" className={classes.listNavBar} button>
                    <ListItemIcon   className={`${activeLink === 'dashboard' ? 'active' : ''}`}>
                        <MoreIcon />
                    </ListItemIcon>
                    <ListItemText  className={`${activeLink === 'dashboard' ? 'active' : ''}`} primary="My Dashboard" />
                </ListItem>
            </Paper>
            <Paper onClick={() => this.handleLinkChange('event')} className={classes.listIconButton} elevation={0}>
                <ListItem component={Link} to="/user/events"  className={classes.listNavBar} button>
                    <ListItemIcon className={`${activeLink === 'event' ? 'active' : ''}`}>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText className={`${activeLink === 'event' ? 'active' : ''}`} primary="Events" />
                </ListItem>
            </Paper>
            <Paper onClick={() => this.handleLinkChange('profile')} className={classes.listIconButton} elevation={0}>
                <ListItem component={Link} to="/user/profile"  className={classes.listNavBar} button>
                    <ListItemIcon className={`${activeLink === 'profile' ? 'active' : ''}`}>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText className={`${activeLink === 'profile' ? 'active' : ''}`} primary="Edit Profile" />
                </ListItem>
            </Paper>
            <Paper onClick={() => this.handleLinkChange('notification')} className={classes.listIconButton} elevation={0}>
                <ListItem  className={classes.listNavBar} button>
                    <ListItemIcon className={`${activeLink === 'notification' ? 'active' : ''}`}>
                        <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText className={`${activeLink === 'notification' ? 'active' : ''}`} primary="Notification" />
                </ListItem>
            </Paper>
            <Paper onClick={() => this.handleLinkChange('payment')} className={classes.listIconButton} elevation={0}>
                <ListItem component={Link} to="/user/membership-payment"  className={classes.listNavBar} button>
                    <ListItemIcon className={`${activeLink === 'payment' ? 'active' : ''}`}>
                        <PaymentCard />
                    </ListItemIcon>
                    <ListItemText className={`${activeLink === 'payment' ? 'active' : ''}`} primary="Payments" />
                </ListItem>
            </Paper>
            <Paper onClick={() => this.handleLinkChange('payment')} className={classes.listIconButton} elevation={0}>
                <ListItem component={Link} to="/user/payment-histroy"  className={classes.listNavBar} button>
                    <ListItemIcon className={`${activeLink === 'paymentHistory' ? 'active' : ''}`}>
                        <PaymentHistory />
                    </ListItemIcon>
                    <ListItemText className={`${activeLink === 'paymentHistory' ? 'active' : ''}`} primary="Payment History" />
                </ListItem>
            </Paper>
        </List>
      </>
    );
  }
}

const styles = {
    listNavBar: {
        padding: '8px 20px',
        marginBottom: 10
    },
    navBar: {
        padding: '40px 0'
    },
    listIconButton: {
        marginBottom: 10,
        borderRadius: 0
    }
}

const mapStateToProps = state => {
    const {UI: { activeLink }} = state;
    return {
        activeLink
    }
}

export default connect(mapStateToProps, actions)(withStyles(styles)(SideBar));
