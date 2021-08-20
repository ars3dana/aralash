import { Carousel } from 'react-bootstrap';
import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    size: {
        maxWidth: "1000px", 
        height: '300px',
        margin: '0 auto 50px',
    },
    item: {
        maxWidth: "1000px", 
        height: '300px',
    },
    img: {
        minWidth: "100%",
        minHeight: "100%"
   
    }
}))
const HomeSlider = () => {
    const classes = useStyles()
    return (
        <Carousel  className={classes.size}>
  <Carousel.Item 
  className={classes.item}
  interval={1500}>
    <img
        className={classes.img}    
      src="https://interier-foto.ru/wp-content/uploads/kuraj-1228.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item 
  className={classes.item}
  interval={1500}>
    <img
        className={classes.img}    
      src="https://автоинфо.рус/wp-content/uploads/2021/05/Long-Straight-Road-1280x720.jpg"
      alt="Second slide"
    />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item 
  interval={1500}
  className={classes.item}>
    <img
        className={classes.img}     
      src="https://interier-foto.ru/wp-content/uploads/kuraj-1228.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    );
};

export default HomeSlider;