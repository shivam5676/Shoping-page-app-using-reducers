const { configureStore, createSlice } = require("@reduxjs/toolkit");

const initialCartState={isOpen:false}
const cartOpenSlice=createSlice({
    name:"cart open and close",
    initialState: initialCartState,
    reducers:{
        openCart(state){
           state.isOpen=!state.isOpen
           
        },
        closeCart(state){
            state.isOpen=false
        }
    }

})
const reducerStore=configureStore({
    reducer:cartOpenSlice.reducer
})
export const cartActions=cartOpenSlice.actions
export default reducerStore