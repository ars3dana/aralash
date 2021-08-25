import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import Typography from '@material-ui/core/Typography';
import { useMain } from '../../contexts/ProductContext';
import { NavLink } from 'react-router-dom';
import { CardActions, Grid, IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { useEffect } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { background, text } from '../../consts/colorConsts';
import "./ProductCard.css"

const useStyles = makeStyles({
  media: {
    height: 170,
    width: "100%",
    borderRadius: 10
  },
  btn: {
    // color : '#FFB236',

  },
  card: {
    backgroundColor: '#FFB236'
  },
  back: {
    background: "rgba( 255, 255, 255, 0.35 )" ,
    borderRadius: 10,     
    padding: 5,
    display:'flex',
    width: '100%',
    flexDirection: 'column'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000  '
  },
  desc: {
    height: 250,
    overflow: 'hidden'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    height: 60
  },
  buy: {
    border: '2px solid'
  }
});
const ProductCard = ({ item }) => {
    const classes = useStyles();
    const { history,addFavorite,favorites, getFavorites,addProductToCart, cart, getCart } = useMain()
    useEffect(() => {
      getFavorites()
    },[])
    useEffect(() => {
      getCart()
    }, [])
    const checkFavorites = (id) => {
      if(favorites && favorites.products){
        const foundItem = favorites?.products.find(product => product.item.id === id)
        return foundItem ? 'secondary' : 'default'
      }
    }
    const checkItemInCart = (id) => {
      if(cart && cart.products){
        const foundItem = cart?.products.find(product => product.item.id === id)
        return foundItem ? 'secondary' : 'default'
      }
    }
    const handleClick = () => {
      history.push('/pay')
    }
    return (
      <Flippy
    flipOnHover={false} // default false
    flipOnClick={true} // default false
    flipDirection="horizontal" // horizontal or vertical
    style={{ width: '230px', height: '290px', margin: '5px' }}
     /// these are optional style, it is not necessary
  >
    <FrontSide
      className="card"
    >
       <CardActionArea>
            <NavLink to={`/details/${item.id}`}>
          <CardMedia
            className={classes.media}
            image={item.image}
          />
            </NavLink>
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
             {item.title}
            </Typography>
            <Typography>
              {item.price}$
            </Typography>
          </CardContent>
        </CardActionArea>
    </FrontSide>
    <BackSide
    className={classes.back}
    >
      <Grid className={classes.desc}>
       <Typography >
         {item.description}
       </Typography>

      </Grid>
      <Grid className={classes.actions}>

      <CardActions>
      <IconButton color={checkFavorites(item.id)} onClick={()=> addFavorite(item)}>
        <StarOutlineRoundedIcon className={classes.btn}/>
      </IconButton>
      <IconButton  onClick={() => handleClick()} >
      <Button className={classes.buy}>Buy</Button>

      </IconButton>
      <IconButton color={checkItemInCart(item.id)} onClick={() => addProductToCart(item)} aria-label="add to favorites">
        <AddShoppingCartIcon  className={classes.btn}/>
      </IconButton>

      </CardActions>
      </Grid>
    
    </BackSide>
  </Flippy>
    );
};

export default ProductCard;