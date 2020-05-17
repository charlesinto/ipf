
import React, { useState, useCallback, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, MenuItem, Menu, Button, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {  makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { REDIRECT_TO_LOGIN, SET_ACTIVE_LINK } from '../redux/types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import InboxIcon from "@material-ui/icons/Inbox";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import PaymentCard from '@material-ui/icons/CardMembership';
import PaymentHistory from '@material-ui/icons/History';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      }
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        flex: 1
      },
    },
    drawerWrapper: {
      width: '40% !important',
      [theme.breakpoints.down('md')]: {
        width: '60%'
      },
    },
    drawerContainer: {
      padding: '6rem 0'
    },
    search: {
      position: 'relative',
    //   borderRadius: theme.shape.borderRadius,
    //   backgroundColor: fade(theme.palette.common.white, 0.15),
    //   '&:hover': {
    //     backgroundColor: fade(theme.palette.common.white, 0.25),
    //   },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      
      display: 'flex',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        display: 'none'
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    memberShipText: {
        lineHeight: '3rem',
        marginRight: 8
    },
    membershipStatus: {
        borderRadius: 16,
        height: '29px',
        marginTop: '0.7rem'
    }
  }));
  

  
  

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDrawer, toggleDrawer] = React.useState(false)
    const activeLink = useSelector(state => state.UI.activeLink, shallowEqual)
    
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const openBDrawer = () => {
    toggleDrawer(true)
  }
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const logoutUser = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    localStorage.removeItem('x-access-token')
    dispatch({type: REDIRECT_TO_LOGIN, payload: ''})
  }
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const list = (anchor) => {
   return ( <div
      className={clsx(classes.drawerContainer, classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List component="nav" className={classes.navBar} aria-label="main mailbox folders">
            <Paper onClick={() => {toggleDrawer(false); dispatch({type: SET_ACTIVE_LINK, payload: 'dashboard'})}} className={classes.listIconButton} elevation={0}>
                <ListItem component={Link} to="/" className={classes.listNavBar} button>
                    <ListItemIcon   className={`${activeLink === 'dashboard' ? 'active' : ''}`}>
                        <MoreIcon />
                    </ListItemIcon>
                    <ListItemText  className={`${activeLink === 'dashboard' ? 'active' : ''}`} primary="My Dashboard" />
                </ListItem>
            </Paper>
            <Paper onClick={() => {toggleDrawer(false); dispatch({type: SET_ACTIVE_LINK, payload: 'event'})}} className={classes.listIconButton} elevation={0}>
                <ListItem component={Link} to="/user/events"  className={classes.listNavBar} button>
                    <ListItemIcon className={`${activeLink === 'event' ? 'active' : ''}`}>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText className={`${activeLink === 'event' ? 'active' : ''}`} primary="Events" />
                </ListItem>
            </Paper>
            <Paper onClick={() => {toggleDrawer(false); dispatch({type: SET_ACTIVE_LINK, payload: 'profile'})}} className={classes.listIconButton} elevation={0}>
                <ListItem component={Link} to="/user/profile"  className={classes.listNavBar} button>
                    <ListItemIcon className={`${activeLink === 'profile' ? 'active' : ''}`}>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText className={`${activeLink === 'profile' ? 'active' : ''}`} primary="Edit Profile" />
                </ListItem>
            </Paper>
            <Paper onClick={() => {toggleDrawer(false); dispatch({type: SET_ACTIVE_LINK, payload: 'notification'})}} className={classes.listIconButton} elevation={0}>
                <ListItem  component={Link} to="/user/notifications"  className={classes.listNavBar} button>
                    <ListItemIcon className={`${activeLink === 'notification' ? 'active' : ''}`}>
                        <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText className={`${activeLink === 'notification' ? 'active' : ''}`} primary="Notification" />
                </ListItem>
            </Paper>
            <Paper onClick={() => {toggleDrawer(false); dispatch({type: SET_ACTIVE_LINK, payload: 'payment'})}} className={classes.listIconButton} elevation={0}>
                <ListItem component={Link} to="/user/membership-payment"  className={classes.listNavBar} button>
                    <ListItemIcon className={`${activeLink === 'payment' ? 'active' : ''}`}>
                        <PaymentCard />
                    </ListItemIcon>
                    <ListItemText className={`${activeLink === 'payment' ? 'active' : ''}`} primary="Payments" />
                </ListItem>
            </Paper>
            <Paper onClick={() => { toggleDrawer(false); dispatch({type: SET_ACTIVE_LINK, payload: 'paymentHistory'})}} className={classes.listIconButton} elevation={0}>
                <ListItem component={Link} to="/user/payment-histroy"  className={classes.listNavBar} button>
                    <ListItemIcon className={`${activeLink === 'paymentHistory' ? 'active' : ''}`}>
                        <PaymentHistory />
                    </ListItemIcon>
                    <ListItemText className={`${activeLink === 'paymentHistory' ? 'active' : ''}`} primary="Payment History" />
                </ListItem>
            </Paper>
        </List>
    </div>)
  };

    const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={11} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </Menu>
      );
      const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={logoutUser}>Log Out</MenuItem>
        </Menu>
      );
      const [state, setState] = useState({})
  
  // const history = useHistory();
  const initiateState = useCallback(() => {
    const getUser = () => {
      var user = JSON.parse(localStorage.getItem('ipf-user'))
      setState(user)
      }

      getUser()
    }, [setState])
      useEffect(() => {
        initiateState()
    }, [initiateState])
    
    return (
        <div>

        
        <div className={classes.grow}>
                <AppBar position="fixed" elevation={0} color="primary">
                <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={openBDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                    Dashboard
                </Typography>
                <div className="appbar-menu-wrapper">

                
                        <div className={classes.search}>
                            <Typography
                                // variant="h6"
                                body1="span"
                                className={classes.memberShipText}
                            >
                                Membership Status
                            </Typography>
                            <Button size="small" className={classes.membershipStatus} variant="contained" color="secondary">
                                {state.approved === 0 ? 'Pending': 'Approved'}
                            </Button>
                            {/* <div className={classes.searchIcon}>
                            <SearchIcon />
                            </div>
                            <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            /> */}
                        </div>
                        
                        <div className={classes.sectionDesktop}>
                            {/* <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                            </IconButton> */}
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                            </IconButton>
                            <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            >
                            <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                            >
                            <MoreIcon />
                            </IconButton>
                        </div>
                </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            
      </div>
      <SwipeableDrawer
              anchor={"left"}
              open={openDrawer}
              onClose={() => toggleDrawer(false)}
              onOpen={() => toggleDrawer(false)}
              className={classes.drawerWrapper}
            >
              {list('left')}
            </SwipeableDrawer>
      </div>
    );
}


export default Header;
