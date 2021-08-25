import React, { useEffect, useState } from 'react';
import { Button, Container, makeStyles, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import { handleInp } from '../consts/functions';
import { useMain } from '../contexts/ProductContext';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        margin: '40px auto',
        maxWidth: 400,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',

    },
    textfield: {
        marginTop: "10px",
    
    }

}))

const EditProduct = () => {
    const {saveEditedProduct, productDetails, getDetails, history} = useMain()
    const classes = useStyles()
    const {id} = useParams()
    const [product, setProduct] = useState({
        title: '',
        type: '',
        image: "",
        description: '',
        price: 0,
        
    })
    useEffect(() => {
        getDetails(id)
    },[])
    useEffect(() => {
        setProduct(productDetails)
    }, [productDetails])

    return (
        <div>
            <Paper className={classes.paper}elevation={3}>
           <h1 className={classes.title}>Edit</h1>
           <Container className={classes.container}>
               <form className={classes.form}noValidate autoComplete='off'>
                <TextField
                className={classes.textfield}
                name='title'
                value={product.title}
                variant="outlined"
                label="title"
                onChange={(e)=> handleInp(e, product, setProduct)}
                />
                <TextField
                className={classes.textfield}
                name='description'
                value={product.description}
                variant="outlined"
                label="Description"
                onChange={(e)=> handleInp(e, product, setProduct)}            
                />
                <Select
                className={classes.textfield}
                name='type'
                variant="outlined"
                label="Type"
                onChange={handleInp}
                >
                    <MenuItem name="type"value="Women's Fashion">Women's Fashion</MenuItem>
                    <MenuItem name="type" value="Men's Fashion">Men's Fashion</MenuItem>
                    <MenuItem name="type" value="Computer,Office">Computer,Office</MenuItem>
                    <MenuItem name="type" value="Home & Pet">Home & Pet</MenuItem>
                    <MenuItem name="type" value="Beauty">Beauty</MenuItem>
                    <MenuItem name="type" value="Toys,Kids">Toys,Kids</MenuItem>
                </Select>
                <TextField
                className={classes.textfield}
                name='image'
                value={product.image}
                variant="outlined"
                label="Image URL"
                onChange={(e)=> handleInp(e, product, setProduct)}
                />
                <TextField
                className={classes.textfield}
                name='price'
                value={product.price}
                variant="outlined"
                label="Price"
                onChange={(e)=>handleInp(e,product,setProduct)}
                />
                <Container>
                <Button onClick={() => saveEditedProduct(product.id, product)}>
                    Save
                </Button>
                <Button onClick={()=> history.push('/admin')}>
                    Cancel
                </Button>
                </Container>
               </form>
           </Container>
        </Paper>
        </div>
    );
};

export default EditProduct;