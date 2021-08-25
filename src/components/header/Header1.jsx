import React from 'react';
import {  alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { header, text } from '../../consts/colorConsts';
import { Button, Grid, InputBase } from '@material-ui/core';
import { useMain } from '../../contexts/ProductContext';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { admin } from '../../consts/consts';


import { useAuth } from '../../contexts/AuthContext';
const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    buttons: {
        width: "500px"
    },
    mainBtn: {
        width: '130px',
        height: '40px',
        border: '2px solid #FAFAFA',
        color: "#F5F5F5"

    },
    text: {
        color: text,
        fontFamily: 'Poppins, sans-serif',
       
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
    back: {
        backgroundColor: header
    },
    mobile: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: "rgba( 255, 255, 255, 0.35 )"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
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
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        color: text,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: text,
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        color: text,
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
  }));
const Header = () => {
  const { history, getProducts} = useMain()
  const { currentUser } = useAuth()
      const classes = useStyles();
      const handleValue = (e) => {
        const search = new URLSearchParams(history.location.search);
        search.set('q', e.target.value);
        history.push(`${history.location.pathname}?${search.toString()}`);
        getProducts();
      };
      const [anchorEl, setAnchorEl] = React.useState(null);
      const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    
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
    
      const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };
    
      const menuId = 'primary-search-account-menu';
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
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
      );
    
      const mobileMenuId = 'primary-search-account-menu-mobile';
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
          <Grid container className={classes.mobile} justify="space-between">            
              <Button className={classes.text} onClick={() => history.push('/list')}>
                  Collection
              </Button>            
              <Button className={classes.text}  onClick={() => history.push('/cart')}>
                  CART
              </Button>
              <Button 
             onClick={()=> history.push('/favorites')}
             className={classes.text}>
                 favorites
              </Button>
              <Button className={classes.text} 
              onClick={()=> { (currentUser.email === admin) ? (history.push('/admin')) : (!currentUser.email) ? history.push('/signup') :  history.push('/user') }}
              className={classes.mainBtn}>
                  PROFILE
              </Button>
              </Grid>
          </MenuItem>
        </Menu>
      );

    return (
        <div className={classes.grow}>
      <AppBar className={classes.back} position="static">
        <Toolbar>
            <IconButton onClick={() => history.push('/')}>
          <Typography className={classes.text} variant="h6" noWrap>
            LOGO
          </Typography>
            </IconButton>
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => handleValue(e)}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <Grid container className={classes.buttons} justify="space-between">            
          <Button className={classes.text} onClick={() => history.push('/list')}>
              Collection
          </Button>            
          <Button className={classes.text}  onClick={() => history.push('/cart')}>
              CART
          </Button>
          <Button 
         onClick={()=> history.push('/favorites')}
         className={classes.text}>
             favorites
          </Button>
          <Button className={classes.text} 
          onClick={()=> { (currentUser.email === admin) ? (history.push('/admin')) : (!currentUser.email) ? history.push('/signup') :  history.push('/user') }}
          className={classes.mainBtn}>
              PROFILE
          </Button>
          </Grid>
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
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
    );
};

export default Header;