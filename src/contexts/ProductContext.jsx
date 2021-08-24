import React, { createContext, useContext, useReducer } from 'react';
import { ACTIONS, JSON_API_PRODUCTS, PRODUCT_LIMIT } from '../consts/consts';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { calcSubPrice, calcTotalPrice } from '../consts/functions';
const mainContext = createContext()
export const useMain = () => {
    return useContext(mainContext)
}
const INIT_STATE = {
    productsData: [],
    productDetail: [],
    cart:[],
    pages: 1,
    favorites: []
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ACTIONS.GET_PRODUCTS:
            return {
                ...state,
                productsData: action.payload.data,
                pages: Math.ceil(action.payload.headers['x-total-count'] / PRODUCT_LIMIT),
            };
        case ACTIONS.GET_DETAILS:
            return {...state, productDetail: action.payload}
        case ACTIONS.GET_FAVORITE:
           return {...state, favorites: action.payload}
        case ACTIONS.GET_CART:
            return { ...state, cart: action.payload };
        default: 
           return state
    }
} 

const ProductContextProvider = ({ children }) => {
    const history = useHistory()
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getProducts = async() => {
        const search = new URLSearchParams(history.location.search);
        search.set('_limit', PRODUCT_LIMIT);
        history.push(`${history.location.pathname}?${search.toString()}`);
        const data = await axios(`${JSON_API_PRODUCTS}/${window.location.search}`);
        dispatch({
        type: ACTIONS.GET_PRODUCTS,
        payload: data,
        });
    }

    const addProduct = async (product) => {
        const data = await axios.post(JSON_API_PRODUCTS, product)
        getProducts()
    }
    const deleteProduct = async(id) => {
        const data = await axios.delete(`${JSON_API_PRODUCTS}/${id}`)
        getProducts()
    }
    const getDetails = async(id) => {
        const {data} = await axios(`${JSON_API_PRODUCTS}/${id}`)
        dispatch({
            type: ACTIONS.GET_DETAILS,
            payload: data
        })
    }
    const saveEditedProduct = async(id, editedProduct) => {
        const data = await axios.patch(`${JSON_API_PRODUCTS}/${id}`, editedProduct)
        getProducts()
        history.push('/list')
    }
    const addFavorite = (product) => {
        let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) {
        favorites = {
        products: [],
      };
    }
    let newProduct = {
      item: product,
    };

    let productToFind = favorites.products.filter((item) => item.item.id === product.id);
    if (productToFind.length === 0) {
        favorites.products.push(newProduct);
    } else {
        favorites.products = favorites.products.filter((item) => item.item.id !== product.id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    dispatch({
      type: ACTIONS.GET_FAVORITE,
      payload: favorites,
    });
    }

    const getFavorites = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        if (!favorites) {
          localStorage.setItem(
            'favorites',
            JSON.stringify({
              products: [],
            })
          );
          favorites = {
            products: [],
          };
        }
        dispatch({
          type: ACTIONS.GET_FAVORITE,
          payload: favorites,
        });
      };
      //Cart
      const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
          localStorage.setItem(
            'cart',
            JSON.stringify({
              products: [],
              totalPrice: 0,
            })
          );
          cart = {
            products: [],
            totalPrice: 0,
          };
        }
        dispatch({
          type: ACTIONS.GET_CART,
          payload: cart,
        });
      };
    
      const addProductToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
          cart = {
            products: [],
            totalPrice: 0,
          };
        }
        let newProduct = {
          item: product,
          count: 1,
          subPrice: +product.price,
        };
    
        let productToFind = cart.products.filter((item) => item.item.id === product.id);
        if (productToFind.length === 0) {
          cart.products.push(newProduct);
        } else {
          cart.products = cart.products.filter((item) => item.item.id !== product.id);
        }
        cart.totalPrice = calcTotalPrice(cart.products);
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
          type: ACTIONS.GET_CART,
          payload: cart,
        });
      };
    
      const changeProductCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.products = cart.products.map((product) => {
          if (product.item.id === id) {
            product.count = count;
            product.subPrice = calcSubPrice(product);
          }
          return product;
        });
        cart.totalPrice = calcTotalPrice(cart.products);
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
          type: ACTIONS.GET_CART,
          payload: cart,
        });
      };
    const values = {
        productsData: state.productsData,
        cart: state.cart,
        productDetails: state.productDetail,
        pages: state.pages,
        favorites: state.favorites,
        history,
        addProduct,
        saveEditedProduct,
        getProducts,
        addProductToCart,
        deleteProduct,
        getCart,
        changeProductCount,
        getDetails,
        addFavorite,
        getFavorites
    
    }
    return (
        <mainContext.Provider value={values}>
            { children }
        </mainContext.Provider>
    );
};

export default ProductContextProvider;