
import React, { useState, useCallback, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, MenuItem, Menu, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {  makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useDispatch } from "react-redux";
import { REDIRECT_TO_LOGIN } from '../redux/types';

const useStyles = makeStyles((theme) => ({
    
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        flex: 1
      },
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
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
        <div className={classes.grow}>
                <AppBar position="fixed" elevation={0} color="primary">
                <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
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
    );
}


export default Header;
