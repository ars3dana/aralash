import { Grid,Button, makeStyles, Typography, Container, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useMain } from '../../contexts/ProductContext';
import Coments from './Coments/Coments';
import { text } from '../../consts/colorConsts';
import Header from '../header/Header';
import ProductCard from './ProductCard';


const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        marginTop: 20,
    },
    img: {
        width: 500,
        height: 500,
        border: '3px solid #FAFAFA',
        
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
        color: text,
        marginBottom: 50
    },
    buy: {
        color: text,
        display: 'flex',
        margin: '20px 0',
        width: 200,
        justifyContent: 'space-between'
    },
    btn: {
        border: '2px solid #FAFAFA',
        color: text
    },
    recomend: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 30
        
    }
    
}));
const ProductDetail = () => {
    const classes = useStyles()
    const {id} = useParams()
    const [rec, setRec] = useState([])
    const {productDetails, getDetails,productsData, getProducts, history} = useMain()
    useEffect(() => {
        getProducts()
    }, [])
    
    const recomend = () => {
        const recArr = productsData.filter((item) => item.type === productDetails.type)
        setRec(productsData)
    }
    console.log(rec)
    useEffect(() => {
        getDetails(id)
    }, [])
    useEffect(() => {
        recomend()
    },[])
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
            {rec.map(item => (
                <ProductCard item={item}/>
            ))}
            </Grid>

        </div>
    );
};

export default ProductDetail;