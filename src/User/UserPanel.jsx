import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
 const useStyles = makeStyles((theme) => ({
    pointer : {
        cursor: 'pointer'
        
    }
 }))
const UserPanel = () => {
    const { currentUser, setCurrentUser } = useAuth()
    const history = useHistory()
    const classes = useStyles()
    const logOut = () => {
        setCurrentUser('')
        history.push('/login')
    }
    return (
        <Grid className={classes.main} >
            <Grid>
                <Typography>
                    {currentUser.email}
                </Typography>
            </Grid>
            <Typography className={classes.pointer} onClick={()=> history.push('/reset')}>
                    ResetPassword
                </Typography>
                <Typography className={classes.pointer} onClick={()=>logOut()}>
                    LogOut
                </Typography>
        </Grid>
    );
};

export default UserPanel;