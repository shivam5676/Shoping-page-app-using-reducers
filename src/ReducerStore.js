const { configureStore, createSlice } = require("@reduxjs/toolkit");

const initialCartState = { isOpen: false };
const cartOpenSlice = createSlice({
  name: "cart open and close",
  initialState: initialCartState,
  reducers: {
    openCart(state) {
      state.isOpen = !state.isOpen;
    },
    closeCart(state) {
      state.isOpen = false;
    },
  },
});

const cartItemState = { itemArray: [] };

const cartItemSlice = createSlice({
  name: "ADD item and remove item (cart)",
  initialState: cartItemState,
  reducers: {
    addItemToCart(state, action) {
      const exisistingIndex = state.itemArray.findIndex(
        (currentItem) => currentItem.id === action.payload.id
      );
      const exisistingItem = state.itemArray[exisistingIndex];
      console.log(exisistingItem);

      if (exisistingItem) {
        const updateItem = {
          ...exisistingItem,
          quantity: exisistingItem.quantity + 1,
        };
        const updateItems = [...state.itemArray];
        updateItems[exisistingIndex] = updateItem;

        state.itemArray = updateItems;
      } else {
        state.itemArray = [...state.itemArray, action.payload];
      }
    },
    removeItemfromCart(state, action) {
      const exisistingIndex = state.itemArray.findIndex(
        (currentItem) => currentItem.id === action.payload.id
      );
      const exisistingItem = state.itemArray[exisistingIndex];
      console.log(exisistingItem);

      if (exisistingItem.quantity >1) {
        const updateItem = {
          ...exisistingItem,
          quantity: exisistingItem.quantity - 1,
        };
        const updateItems = [...state.itemArray];
        updateItems[exisistingIndex] = updateItem;

        state.itemArray = updateItems;
      } else  {
        const removedItemArray = state.itemArray.filter((current) => {
          current.id !== action.payload.id;
        });
        state.itemArray = removedItemArray
      }
    },
  },
});
const reducerStore = configureStore({
  reducer: { cartOpen: cartOpenSlice.reducer, cartItem: cartItemSlice.reducer },
});
export const cartActions = cartOpenSlice.actions;
export const cartItemActions = cartItemSlice.actions;
export default reducerStore;
