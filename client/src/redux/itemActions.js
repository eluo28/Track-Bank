import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING,UPDATE_ITEM} from './actionTypes';
import axios from 'axios';
import {tokenConfig} from './authActions';
import {returnErrors} from './errorActions';

export const getItems = (email)=>dispatch=>{
    dispatch(setItemsLoading());
    axios
        .get('/api/items',email)
        .then(res=>
            dispatch({
                type:GET_ITEMS,
                payload:res.data
            }))
            .catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));
};


export const deleteItem = id =>(dispatch,getState)=>{
    axios.delete(`/api/items/${id}`,tokenConfig(getState)).then(res=>
            dispatch({
                type:DELETE_ITEM,
                payload:id
            })
        );
};

export const addItem = (formData)=>(dispatch,getState)=>{
    axios
        .post('api/items',formData,tokenConfig(getState))
        .then(res=>
            dispatch({
            type:ADD_ITEM,
            payload:res.data
        })
    )
};

export const updateItem = data=>(dispatch,getState)=>{
    axios
        .post('api/items/update',data,tokenConfig(getState))
        .then(res=>
            dispatch({
                type:UPDATE_ITEM,
                payload:res.data
            })
            );

            
};


export const setItemsLoading=()=>{
    return{
        type:ITEMS_LOADING
    }
}