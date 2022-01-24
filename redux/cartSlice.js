import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: `cart`,
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addItem: (state, action) => {
            const item = state.products.findIndex(i => i._id === action.payload._id)
            if(item === -1){
                state.products = [...state.products, action.payload];
                state.quantity += 1;
                state.total += (action.payload.price * action.payload.quantity)
            }
        },
        deleteItem: (state, action) => {
            state.products = [...state.products.filter(i => i._id !== action.payload)];
            state.quantity -= 1;
            state.total = state.products.reduce((acc,val) =>{
                acc += (val.price * val.quantity);
                return acc
            },0)
        },
        resetCart : (state) => {
            state = initialState;
        }

    }
})
export const { addItem, deleteItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;