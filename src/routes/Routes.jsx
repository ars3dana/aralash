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
import Cart from '../components/Cart/Cart';
import Creditcard from '../components/Cart/CreditCard/CreditCard';
import FavoriteProducts from '../components/Products/FavoriteProducts';
import AdminPanel from '../admin/AdminPanel';
import UserPanel from '../User/UserPanel';
import UpdateProfile from '../Auth/ResetPasword';

const Routes = () => {
    return (
        <AuthContextProvider>
        <BrowserRouter>
        <ProductContextProvider>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/list" component={ProductList}/>
                <Route exact path="/add" component={AddProduct}/>
                <Route exact path="/cart" component={Cart}/>
                <Route exact path="/pay" component={Creditcard}/>
                <Route exact path="/edit/:id" component={EditProduct}/>
                <Route exact path="/details/:id" component={ProductDetail}/> 
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/forgot-password' component={ForgotPassword}/>
                <Route exact path="/favorites" component={FavoriteProducts}/>
                <Route exact path="/admin" component={AdminPanel}/>
                <Route exact path="/user" component={UserPanel}/>
                <Route exact path="/reset" component={UpdateProfile}/>
                
            </Switch>
        </ProductContextProvider>
        </BrowserRouter>
        </AuthContextProvider>
    );
};

export default Routes;