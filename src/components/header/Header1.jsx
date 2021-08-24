import React from 'react';
import {  alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { header, text } from '../../consts/colorConsts';
import { Button, Grid, InputBase } from '@material-ui/core';
import { useMain } from '../../contexts/ProductContext';
import SearchIcon from '@material-ui/icons/Search';
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
  }));
const Header = () => {
  const { history, getProducts} = useMain()

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
          <Grid container className={classes.buttons} justify="space-between">            
          <Button className={classes.text} onClick={() => history.push('/list')}>
              Collection
          </Button>            
          <Button className={classes.text} onClick={() => history.push('/cart')}>
              cart
          </Button>
          <Button
          onClick={()=> history.push('/favorites')}
          className={classes.text}>
              favorites
          </Button>
          <Button 
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