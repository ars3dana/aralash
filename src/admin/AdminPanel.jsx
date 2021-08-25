import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import Header from '../components/header/Header';
import FavoritesCard from '../components/Products/FavoritesCard';
import { text } from '../consts/colorConsts';
import { useAuth } from '../contexts/AuthContext';
import { useMain } from '../contexts/ProductContext';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
const useStyles =  makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'space-between',
        padding: 10
      
    },
    data: {
        maxWidth: 770,
        height: 600,
        padding: 8,
        overflow: 'scroll',
        border: '5px solid #FAFAFA',
        display: 'flex',
        flexWrap: 'wrap'
    },
    title: {
        color: text,
        margin: '30px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 200,
        
    },
}))
const AdminPanel = () => {

    const classes = useStyles()
    const { productsData, getProducts,history } = useMain()
    const { setCurrentUser } = useAuth()
    useEffect(() => {
        getProducts()
    },[])
     const logOut = () => {
        setCurrentUser('');
        history.push('/login')
    }
    return (
        <>
        <Header/>
        <Grid className={classes.title}>
            <Typography  variant="h3">
                Admin
            </Typography>
            <Typography onClick={() => logOut()}>
                Log Out
            </Typography>
        </Grid>
        <Grid className={classes.main}>
            <Grid>
                <AddProduct/>
            </Grid> 
            

        <Grid>
        <Grid className={classes.data}>
        {
            productsData.map(item => (
                <FavoritesCard item={item}/>
            ))
        }
        </Grid>
        </Grid>
        </Grid>
        </>
    );
};

export default AdminPanel;