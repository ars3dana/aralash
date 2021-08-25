import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { text } from '../../consts/colorConsts';
import { useMain } from '../../contexts/ProductContext';
import Header from '../header/Header';
import FavoritesCard from './FavoritesCard';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
    window: {
        padding: 30,
        color: text,
        display: 'flex',
        flexWrap: 'wrap'
    },
    cursor: {
        cursor: 'pointer'
    }
}))
const FavoriteProducts = () => {
    const classes = useStyles()
    const {favorites, getFavorites, history} = useMain()
    useEffect(() => {
        getFavorites()
    },[])
    return (
        <>
        <Header/>
        <Grid container justify='center' className={classes.window}>
            <Typography variant="h3">
                FAVORITES
            </Typography>
            <Grid container justify="space-evenly">
            {!favorites.products.length == 0 ? (favorites.products.map(item => (
                <ProductCard item={item.item}/>
            ))):(<Grid container justify="center" alignItems="center">
                <Typography  className={classes.cursor}onClick={()=> history.push('/list')} variant="h2">
                COLLECTION
            </Typography>
                </Grid>
            ) }
            </Grid>
        </Grid>
        </>
    );
};

export default FavoriteProducts;