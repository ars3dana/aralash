import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { text } from '../../consts/colorConsts';
const useStyles = makeStyles((theme) => ({
    title: {
        color: text
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