import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import './Sidebar.css';
import { useState } from "react";
import { useMain } from '../../contexts/ProductContext';
import { Radio, FormControl, FormLabel, Grid, Paper, RadioGroup, FormControlLabel, Button, Slider } from "@material-ui/core";
import { background,header,text } from '../../consts/colorConsts';
const useStyles = makeStyles((theme) => ({
    paper: {
      width: '90px',
      height: '150px',
      
    },
    back: {
      background: "rgba( 255, 255, 255, 0.35 )",
      padding: 10,
      borderRadius: 10
      
    },
    radio: {
      
    },
    sidebar: {
      width: '250px',
      // height: '150px',
      marginTop: 70
      // position: 'fixed',
    },
    btn: {
      // backgroundColor: header,
      // color: text
    }
  }));

const Sidebar = () => {
    const classes = useStyles();
    const { getProducts, history } = useMain()
    const [type, setType] = useState(getType(history))
    const [price, setPrice] = useState(getPrice())
    

    function getType(history){
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
                value="Women's Fashion"
                control={<Radio color="default" className={classes.radio} />}
                label="Women's Fashion"                
              />
              <FormControlLabel
                value="Men's Fashion"
                control={<Radio color="default" className={classes.radio}/>}
                label="Men's Fashion"
              />
               <FormControlLabel
                value="Computer,Office"
                control={<Radio color="default" className={classes.radio}/>}
                label="Computer,Office"
              />
               <FormControlLabel
                value="Home & Pet"
                control={<Radio color="default" className={classes.radio}/>}
                label="Home & Pet"
              />
               <FormControlLabel
                value="Beauty"
                control={<Radio color="default" className={classes.radio}/>}
                label="Beauty"
              />
               <FormControlLabel
                value="Toys,Kids"
                control={<Radio color="default" className={classes.radio}/>}
                label="Toys,Kids"
              />
              <FormControlLabel
                value="all"
                control={<Radio color="default" className={classes.radio}/>}
                label="All"
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