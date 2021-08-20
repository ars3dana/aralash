import { Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMain } from '../../contexts/ProductContext';

const ProductDetail = () => {
    const {id} = useParams()
    const {details, getDetails} = useMain()
    useEffect(() => {
        getDetails(id)
    }, [])
    return (
        <div>
            <Grid>
                <Grid>
                <Grid>

                </Grid>
                <Grid>
                    <Typography>
                        {details.title}
                    </Typography>
                </Grid>
                </Grid>
                <Grid>

                </Grid>
            </Grid> 
        </div>
    );
};

export default ProductDetail;