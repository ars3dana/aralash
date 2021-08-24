import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { header, text } from '../../consts/colorConsts';
import { Button, Grid } from '@material-ui/core';
import { useMain } from '../../contexts/ProductContext';

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
        border: '3px solid #FE7C02',
        color: text,
    },
    text: {
        color: text,
        fontFamily: 'Poppins, sans-serif',
       
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
  const { history} = useMain()

      const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


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
  
  const mobileMenuId = 'primary-search-account-menu-mobile';
  

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
          onClick={()=> history.push('/login')}
          className={classes.mainBtn}>
              PROFILE
          </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      
    </div>
    );
};

export default Header;