import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import Typography from '@material-ui/core/Typography';
import { useMain } from '../../contexts/ProductContext';
import { NavLink } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { useEffect } from 'react';


const useStyles = makeStyles({
  root: {
    width: 280,
    margin: 10,
    height: 300
  },
  media: {
    height: 140,
  },
  content: {
    height: 35,
    overflow: 'hidden'
  }
});
const FavoritesCard = ({ item }) => {
console.log(item)
    const classes = useStyles();
    const { addFavorite,favorites, getFavorites,addProductToCart, cart, getCart } = useMain()
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
    return (
      <Card className={classes.root}>
        <CardActionArea>
            <NavLink to={`/details/${item.id}`}>
          <CardMedia
            className={classes.media}
            image={item.image}
          />
            </NavLink>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
             {item.title}
            </Typography>
            <div className={classes.content}>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.description}
            </Typography>

            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
      <IconButton color={checkFavorites(item.id)} onClick={()=> addFavorite(item)}>
        <StarOutlineRoundedIcon/>
      </IconButton>
      <IconButton color={checkItemInCart(item.id)} onClick={() => addProductToCart(item)} aria-label="add to favorites">
        <AddShoppingCartIcon />
      </IconButton>
        </CardActions>
      </Card>
    );
};
export default FavoritesCard;