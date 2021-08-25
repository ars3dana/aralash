import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import { header, text } from '../../consts/colorConsts';
import { Button, Grid } from '@material-ui/core';
import { useMain } from '../../contexts/ProductContext';
import { useAuth } from '../../contexts/AuthContext';
import { admin } from '../../consts/consts';
import { alpha } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

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
        color: text,
    },
    text: {
        color: text,
        fontFamily: 'Poppins, sans-serif',
       
    },
    mobile: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: "rgba( 255, 255, 255, 0.35 )"
    },
    back: {
        backgroundColor: header,
        color: text 
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
  }));
const Header = () => {
  const classes = useStyles();
  const { history} = useMain()
  const { currentUser } = useAuth()
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
      <Grid  className={classes.mobile} justify="space-between">            
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
console.log(currentUser)
    return (
        <div className={classes.grow}>
      <AppBar className={classes.back} position="static">
        <Toolbar>
            <IconButton onClick={() => history.push('/')}>
          <Typography className={classes.text} variant="h6" noWrap>
            LOGO
          </Typography>
            </IconButton>
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