import { Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useMain } from '../../contexts/ProductContext';
import ProductCard from './ProductCard';
import { getCurrentPage } from '../../consts/functions';
import { Pagination } from '@material-ui/lab';
import Sidebar from '../header/Sidebar';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex'
    },
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
            <Container className={classes.container}>

            <Grid>
                <Sidebar/>
            </Grid>
        <Grid container justify="space-evenly">
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