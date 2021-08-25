import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useEffect } from 'react';
import { Button, Grid, IconButton, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useMain } from '../../contexts/ProductContext';
import Header from '../header/Header';
import { text } from '../../consts/colorConsts';

const useStyles = makeStyles({
  table: {
    maxWidth: 1400,
    background: "rgba( 255, 255, 255, 0.35 )"
  },
  tableCellImg: {
    width: 50,
    background: "rgba( 255, 255, 255, 0.35 )"
  },
  btn: {
    width:'100px',
    height:'60px',
    borderRadius: '7px',
    color: '#000',
    border: '2px solid #000',
    textDecoration: 'none',
    fontFamily: 'Poppins, sans-serif'
  },
  text: {
    textDecoration: 'none'
  }
});

export default function Cart() {
  const classes = useStyles();
  const [count, setCount] = useState([]);
  const { cart, getCart, changeProductCount, history} = useMain();

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    setCount(count);
  }, [cart]);

  const handleCountChange = (count, id) => {
    changeProductCount(count, id);
  };
  const buy = () => {
    localStorage.clear();
    history.push('/pay')
  }
  return (
    <>
    <Header/>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">SubPrice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.products?.length > 0 &&
            cart.products.map((product) => (
              <TableRow key={product.item.id}>
                <TableCell>
                  <img className={classes.tableCellImg} src={product.item.image} alt={product.item.title} />
                </TableCell>
                <TableCell align="right">{product.item.title}</TableCell>
                <TableCell align="right">{product.item.price}</TableCell>
                <TableCell align="right">
                  <input
                    type="number"
                    value={product.count}
                    onChange={(e) => handleCountChange(e.target.value, product.item.id)}
                  />
                </TableCell>
                <TableCell align="right">{product.subPrice}</TableCell>
              </TableRow>
            ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>
              <Typography variant="h5">Total:</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h5">{cart.totalPrice}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Grid container justify="center">
    <Button  
    onClick={buy}
    className={classes.btn}>BUY</Button>
      </Grid>
    </TableContainer>
    </>
  );
}