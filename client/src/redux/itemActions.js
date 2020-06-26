import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING,UPDATE_ITEM} from './actionTypes';
import axios from 'axios';

export const getItems = ()=>dispatch=>{
    dispatch(setItemsLoading());
    axios
        .get('/api/items')
        .then(res=>
            dispatch({
                type:GET_ITEMS,
                payload:res.data
            }))
};


export const deleteItem = id =>dispatch=>{
    axios.delete(`/api/items/${id}`).then(res=>
            dispatch({
                type:DELETE_ITEM,
                payload:id
            })
        );
};

export const addItem = (formData)=>dispatch=>{
    axios
        .post('api/items',formData)
        .then(res=>
            dispatch({
            type:ADD_ITEM,
            payload:res.data
        })
    )
};

export const updateItem = data=>dispatch=>{
    axios
        .post('api/items/update',data)
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