import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddProduct from '../admin/AddProduct';
import EditProduct from '../admin/EditProduct';
import Login from '../Auth/Login';
import ForgotPassword from '../Auth/ForgotPassword';
import Header from '../components/header/Header';
import Home from '../components/home/Home';
import ProductDetail from '../components/Products/ProductDetail';
import ProductList from '../components/Products/ProductList';
import AuthContextProvider from '../contexts/AuthContext';
import ProductContextProvider from '../contexts/ProductContext';
import Signup from '../Auth/Signup';

const Routes = () => {
    return (
        <AuthContextProvider>
        <BrowserRouter>
        <ProductContextProvider>
         <Header/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/list" component={ProductList}/>
                <Route exact path="/add" component={AddProduct}/>
                <Route exact path="/edit/:id" component={EditProduct}/>
                <Route exact path="/details/:id" component={ProductDetail}/> 
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/forgot-password' component={ForgotPassword}/>
            </Switch>
        </ProductContextProvider>
        </BrowserRouter>
        </AuthContextProvider>
    );
};

export default Routes;