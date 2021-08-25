import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles((theme) => ({
    coment: {
        width: 300,
        height: 49,
        border: '2px solid black',
        borderRadius: 10,
        marginBottom: 10,
        // backgroundColor: '#fcc556',
        color: '#000',
        padding: 2
    },
    users: {
        color: '#212121',
        fontSize: 15,
        fontWeight: 'bold'
    }
}))
const ComentsCard = ({item}) => {
    const classes = useStyles()
    return (
        <div className={classes.coment}>
            <Typography className={classes.users}>
                {item.user}
            </Typography>
            <Typography>
            {item.comment}

            </Typography>
        </div>
    );
};

export default ComentsCard;