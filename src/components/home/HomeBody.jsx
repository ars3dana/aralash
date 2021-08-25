import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { text } from '../../consts/colorConsts';
const useStyles = makeStyles((theme) => ({
    title: {
        color: '#FAFAFA',
        fontWeight: 500,
        textShadow: '0px 10px 2px rgba(0,0,0,0.1)'
    }
}));
const HomeBody = () => {
    const classes = useStyles()
    return (
        <Grid container justify="center">
            
            <Typography className={classes.title}variant="h2">
                ARALASH
            </Typography>
        </Grid>
    );
};

export default HomeBody;