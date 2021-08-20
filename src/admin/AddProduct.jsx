import React, { useState } from 'react';
import { Button, Container, makeStyles, Paper, TextField } from '@material-ui/core';
import { useMain } from '../contexts/ProductContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        margin: '40px auto',
        maxWidth: 800,
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


const AddProduct = () => {
const { addProduct } = useMain()
const classes = useStyles()
const history = useHistory()
const [product, setProduct] = useState({
    title: '',
    description: '',
    type: '',
    image: '',
    price: 0
})
    const handleInp = (e) => {
            if( e.target.name == 'price'){
                let newProduct = {
                    ...product,
                [e.target.name]: Number(e.target.value)
            }
            setProduct(newProduct)
            }else {
                let newProduct = {
                    ...product,
                [e.target.name]: (e.target.value)
            }
            setProduct(newProduct)
        }
        
    }
    const saveProduct = (product) => {
        addProduct(product)
        history.push("/list")
    } 
    return (
        <div>
            <Paper className={classes.paper}elevation={3}>
           <h1 className={classes.title}>Add Product</h1>
           <Container className={classes.container}>
               <form className={classes.form}noValidate autoComplete='off'>
                <TextField
                className={classes.textfield}
                name='title'
                variant="outlined"
                label="title"
                onChange={handleInp}
                />
                <TextField
                className={classes.textfield}
                name='description'
                variant="outlined"
                label="Description"
                onChange={handleInp}            
                />
                <TextField
                className={classes.textfield}
                name='type'
                variant="outlined"
                label="Type"
                onChange={handleInp}
                />
                <TextField
                className={classes.textfield}
                name='image'
                variant="outlined"
                label="Image URL"
                onChange={handleInp}
                />
                <TextField
                className={classes.textfield}
                name='price'
                variant="outlined"
                label="Price"
                type="number"
                onChange={handleInp}
                />
                <Container>
                <Button onClick={() => saveProduct(product)}>
                    Save
                </Button>
                <Button onClick={()=> history.push('/list')}>
                    Cancel
                </Button>
                </Container>
               </form>
           </Container>
        </Paper>
        </div>
    );
};

export default AddProduct;