import { Grid, Button,makeStyles, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { JSON_API_PRODUCTS } from '../../../consts/consts';
import { useAuth } from '../../../contexts/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMain } from '../../../contexts/ProductContext';
import ComentsCard from './ComentsCard';
const useStyles = makeStyles((theme) => ({
    comentWindow: {
        width: 600,
        height: 300,
        border: 'solid 2px #FC9F03',
        padding: 10,
        overflow: 'scroll',
        margin: '40px 0 5px 0'
    },
    btn: {
        color:"#fcc556"
    },
    root: {
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
      },
    input: {
        width: 550,
        border: '2px solid #fcc556',
        color: "#000",
    
        borderRadius: 15

    }
}))
const Coments = () => {
    const classes = useStyles()
    const {currentUser} = useAuth()
    const { getProducts,productDetails, getDetails,history } = useMain()
    const [value, setValue] = useState('')
    const {id} = useParams()
    const [product, setProduct] = useState('')
    const [coment, setComent] = useState('')
    const handleInp = (e) => {
        let coment = {
            comment: e.target.value,
            user: currentUser.email
        }
        setComent(coment)
        setValue(e.target.value)
    }
    useEffect(()=> {
        getDetails(id)
    },[])
    const addComent = async() => {
        productDetails.comments.push(coment)
        setProduct(productDetails)
        const data = await axios.patch(`${JSON_API_PRODUCTS}/${id}`,product)
        getProducts(history)
        setValue('')
    }
        
    // const dar = new Date(date,hours)
    // console.log(dar)
    return (
        <>
       
        <Grid container justify="center">
            <Grid className={classes.comentWindow}>
            {productDetails.comments ? (productDetails.comments.map((item) => (
                <ComentsCard item={item}/>
            ))
            ) : (
                <div className={classes.root}>
                <CircularProgress color="secondary" />
              </div>
            )}
            </Grid>
            <input value={value} className={classes.input} onChange={handleInp}/>
            <Button className={classes.btn} onClick={() => addComent( product.id)}>Send</Button>
        </Grid>
          
        </>
    );
};

export default Coments;