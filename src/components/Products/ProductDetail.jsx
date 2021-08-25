import { Grid,Button, makeStyles, Typography, Container, IconButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useMain } from '../../contexts/ProductContext';
import Coments from './Coments/Coments';
import { text } from '../../consts/colorConsts';
import Header from '../header/Header';

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
        width: 550,
        marginRight: 20
    },
    imgSize: {
        width: '100%',
        height: '100%'
    },
    about: {
       color: text
    },
    title: {
        color: '#fcc556',
        marginBottom: 50
    },
    buy: {
        color: '#fcc556',
        display: 'flex',
        margin: '20px 0',
        width: 200,
        justifyContent: 'space-between'
    },
    btn: {
        border: '2px solid #fcc556',
        color: '#fcc556'
    },
    recomend: {
        height: 200
    }
    
}));
const ProductDetail = () => {
    const classes = useStyles()
    const {id} = useParams()
    const {productDetails, getDetails, getProducts, history} = useMain()
    useEffect(() => {
        getDetails(id)
    }, [])
    
    return (
        <div>
            <Header/>
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

                <Grid className={classes.about}>
                <Typography className={classes.title}align="center" variant="h3">
                    {productDetails.title}
                </Typography>
                <Typography>
                    {productDetails.description}
                </Typography>
                <Grid className={classes.buy}>
                <Typography variant="h5">
                    {productDetails.price} $
                </Typography>
                <Button onClick={()=> history.push('/pay')} className={classes.btn}>buy</Button>
                </Grid>
                <Coments item={productDetails}/>
                </Grid>
            </Container> 
            <Grid className={classes.recomend}>

            </Grid>

        </div>
    );
};

export default ProductDetail;