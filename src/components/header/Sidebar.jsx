import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { useState } from "react";
import { useMain } from '../../contexts/ProductContext';
import { Radio, FormControl, FormLabel, Grid, Paper, RadioGroup, FormControlLabel, Button, Slider } from "@material-ui/core";
import { background,gren } from '../../consts/colorConsts';
const useStyles = makeStyles((theme) => ({
    paper: {
      width: '90px',
      height: '150px',
      
    },
    back: {
      backgroundColor: gren,
      color: background,
      padding: 10
      
    },
    radio: {
      color: background,
    },
    sidebar: {
      width: '250px',
      height: '150px',
  
      // position: 'fixed',
    },
    btn: {
      backgroundColor: background
    }
  }));

const Sidebar = () => {
    const classes = useStyles();
    const { getProducts, history } = useMain()
    const [type, setType] = useState(getType(history))
    const [price, setPrice] = useState(getPrice())
    

    function getType(history){
      console.warn(history)
      const search = new URLSearchParams(history.location.search)
      return search.get('type')
    }
  
    function getPrice(){
      const search = new URLSearchParams(history.location.search)
      return search.get('price_lte')
    }
  
    const handleChangeType = (e) => {
      if(e.target.value == "all"){
        const search = new URLSearchParams(history.location.search)
        search.delete('type')
        history.push(`${history.location.pathname}?${search.toString()}}`)
        getProducts()
        setType(e.target.value)
        return
      }
      const search = new URLSearchParams(history.location.search)
      search.set('type', e.target.value)
      history.push(`${history.location.pathname}?${search.toString()}`)
      getProducts()
      setType(e.target.value)
    }
  
    const handleChangePrice = (e, value) => {
      const search = new URLSearchParams(history.location.search)
      search.set('price_lte', value)
      history.push(`${history.location.pathname}?${search.toString()}`)
      getProducts()
      setPrice(value)
    }
  
    const resetPrice = () => {
      const search = new URLSearchParams(history.location.search)
      search.delete('price_lte')
      history.push(`${history.location.pathname}?${search.toString()}`)
      getProducts()
      setPrice(getPrice())
    }
    return (
        <Grid  className={classes.sidebar}>
        <Paper elevation={2} className={classes.back}>
          <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <RadioGroup value={type} onChange={handleChangeType}>
              <FormControlLabel
                value="box"
                control={<Radio color="default" className={classes.radio} />}
                label="Коробки"                
              />
              <FormControlLabel
                value="item"
                control={<Radio color="default" className={classes.radio}/>}
                label="Аксессураы"
              />
              <FormControlLabel
                value="all"
                control={<Radio color="default" className={classes.radio}/>}
                label="Все"
              />
            </RadioGroup>
          </FormControl>
  
          <Grid container justify="center">
            <Slider
            value={price}
            onChange={handleChangePrice}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            className={classes.back}
            min={0}
            max={50}
            />
            <Button 
            onClick={resetPrice} 
            variant="outlined" 
            className={classes.btn}>Clear</Button>
          </Grid>
        </Paper>
      </Grid>
    );
};

export default Sidebar;