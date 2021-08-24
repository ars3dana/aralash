import { Grid, makeStyles, Typography, Container, IconButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useMain } from '../../contexts/ProductContext';
import Coments from './Coments/Coments';

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        marginTop: 20,
    },
    img: {
        width: 500,
        height: 500,
        border: '3px solid #000',
        
    },
    media: {
        width: 550
    },
    imgSize: {
        width: '100%',
        height: '100%'
    }
    
}));
const ProductDetail = () => {
    const classes = useStyles()
    const {id} = useParams()
    const {productDetails, getDetails, getProducts} = useMain()
    useEffect(() => {
        getDetails(id)
    }, [])
    
    return (
        <div>
            <Container className={classes.main}>
                <Grid className={classes.media}>
                <Grid className={classes.img}>
                <img src={productDetails.image} className={classes.imgSize} />
                </Grid>
                <Grid>
                <IconButton>
                     <FavoriteBorderIcon/> 
                {productDetails.like}
                </IconButton>
                </Grid>
                </Grid>

                <Grid >
                <Typography align="center" variant="h3">
                    {productDetails.title}
                </Typography>
                <Typography>
                    {productDetails.description}
                </Typography>
                <Coments item={productDetails}/>
                </Grid>
            </Container> 

        </div>
    );
};

export default ProductDetail;