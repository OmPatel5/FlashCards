import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { useDispatch } from "react-redux";


export const loadCards = createAsyncThunk(
    "cards/getAllCards", 
    async () => {
        let cardObj = {}
        await Axios.get("https://flashcards-api-zrei.onrender.com/getCards").then((response) => {
            for (let card in response.data) {
                cardObj[response.data[card].id] = {
                    _id: response.data[card]._id,
                    id: response.data[card].id,
                    front: response.data[card].front,
                    back: response.data[card].back
                };
            }
        })
        
        return cardObj;
    }
)

export const addCardToDB = createAsyncThunk(
    "cards/addCard", 
    async (card, thunkAPI) => {
        Axios.post("https://flashcards-api-zrei.onrender.com/createCard", {
            id: card.id, 
            front: card.front,
            back: card.back
        })
    }
)



const cardsSlice = createSlice({
    name: 'cards', 
    initialState: {
        cards: {}
    },
    reducers: {
        addCard: (state, action) => {
            state.cards[action.payload.id] === undefined ? state.cards[action.payload.id] = {...action.payload} 
                : 
            state.cards[action.payload.id].push({...action.payload})
        }
    },

    extraReducers: {
        [loadCards.pending]: (state, action) => {
            
        },

        [loadCards.fulfilled]: (state, action) => {
            state.cards = action.payload;
        }
    }

});

export const selectCards = (state) => {
    return state.cards.cards
};



export const { addCard } = cardsSlice.actions;
export default cardsSlice.reducer;