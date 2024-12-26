import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slice/dataSlice'
import ingredientsReducer from './slice/ingredientsSlice'
import cartReducer from'./slice/cartSlice'

export default configureStore({
    reducer:{
        dataSlice : dataReducer,
        ingredientsSlice : ingredientsReducer,
        cartSlice : cartReducer
    }
}) 