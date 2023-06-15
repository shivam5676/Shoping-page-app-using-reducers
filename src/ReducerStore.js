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
      console.log(action.payload.token);
      const existingIndex = state.itemArray.findIndex(
        (currentItem) => currentItem.id === action.payload.id
      );
      const existingItem = state.itemArray[existingIndex];

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        const updatedItems = [...state.itemArray];
        updatedItems[existingIndex] = updatedItem;

        state.itemArray = updatedItems;
      } else {
        state.itemArray = [...state.itemArray, action.payload];
      }
    },
    removeItemFromCart(state, action) {
      const existingIndex = state.itemArray.findIndex(
        (currentItem) => currentItem.id === action.payload.id
      );
      const existingItem = state.itemArray[existingIndex];
      console.log(existingItem);

      if (existingItem.quantity > 1) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        const updatedItems = [...state.itemArray];
        updatedItems[existingIndex] = updatedItem;

        state.itemArray = updatedItems;
      } else {
        const removedItemArray = state.itemArray.filter((current) => {
        return  current.id !== action.payload.id;
        });
        state.itemArray = removedItemArray;
      }
    },
  },
});



const uiSlice = createSlice({
  name: "Ui",
  initialState: {notification: null},
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

const reducerStore = configureStore({
  reducer: {
    cartOpen: cartOpenSlice.reducer,
    cartItem: cartItemSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export const uiActions = uiSlice.actions;
export const cartActions = cartOpenSlice.actions;
export const cartItemActions = cartItemSlice.actions;
export default reducerStore;
