import React, { createContext, useContext, useReducer } from 'react';
import { ACTIONS, JSON_API_PRODUCTS, PRODUCT_LIMIT } from '../consts/consts';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
const mainContext = createContext()
export const useMain = () => {
    return useContext(mainContext)
}
const INIT_STATE = {
    productsData: [],
    productDetail: [],
    pages: 1,
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
    }

 
    const values = {
        productsData: state.productsData,
        details: state.productDetail,
        pages: state.pages,
        history,
        addProduct,
        saveEditedProduct,
        getProducts,
        deleteProduct,
        getDetails,
    
    }
    return (
        <mainContext.Provider value={values}>
            { children }
        </mainContext.Provider>
    );
};

export default ProductContextProvider;