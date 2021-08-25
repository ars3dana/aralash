import { Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useMain } from '../../contexts/ProductContext';
import ProductCard from './ProductCard';
import { getCurrentPage } from '../../consts/functions';
import { Pagination } from '@material-ui/lab';
import Sidebar from '../header/Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import Header1 from '../header/Header1';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap:'wrap'
    },
    side: {
        width: 280, 
        margin: '0 auto'
    }, 
    list: {
        paddingTop: 60,
        maxWidth: 970  

    }
}))

const ProductList = () => {
    const classes = useStyles()
    const { productsData, getProducts, pages, history } = useMain()
    const [page, setPage] = useState(getCurrentPage())
    useEffect(() => {
        getProducts()
    }, [])

    const handlePage = (e, page) => {
        const search = new URLSearchParams(window.location.search);
        search.set('_page', page);
        history.push(`${history.location.pathname}?${search.toString()}`);
        getProducts();
        setPage(page);
      };
    
    return (
        <Grid container >
            <Header1/>
            <Container className={classes.container}>

            <Grid calssName={classes.side}>
                <Sidebar/>
            </Grid>
        <Grid container justify="space-evenly" className={classes.list}>
            {productsData ? (productsData.map((item) => (
                <ProductCard item={item}/>
            ))) : (
                <>
                <h1>Загрузка товаров</h1>
                </>
            )}
        </Grid>
            </Container>
        <div style={{ margin: '20px auto' }}>
            <Pagination 
            count={pages} 
            page={+page} 
            onChange={handlePage}
            />
      </div>
        </Grid>
    );
};

export default ProductList;