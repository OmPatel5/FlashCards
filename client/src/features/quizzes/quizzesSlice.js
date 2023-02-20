import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addQuizId } from "../topics/topicsSlice";

import Axios from "axios";

export const createAndAssociateQuizWithTopicThunkActionCreator = (payload) => {
    return (dispatch) => {
        console.log(payload)
        dispatch(addQuizToDB(payload));
        dispatch(addQuiz(payload));

        dispatch(addQuizIdToDB(payload));
        dispatch(addQuizId(payload));
    }
} 

export const loadQuizzes = createAsyncThunk(
    "quizzes/getAllQuizzes", 
    async () => {
        let quizObj = {}
        await Axios.get("https://flashcards-api-zrei.onrender.com/getQuizzes").then((response) => {
            for (let quiz in response.data) {
                quizObj[response.data[quiz].id] = {
                    _id: response.data[quiz]._id,
                    id: response.data[quiz].id,
                    topicId: response.data[quiz].topicId,
                    name: response.data[quiz].name,
                    cardIds: response.data[quiz].cardIds,
                    createdBy: response.data[quiz].createdBy
                };
            }
        })

        return quizObj;
    }
)

export const addQuizToDB = createAsyncThunk(
    "quizzes/addQuizzes", 
    async (quiz, thunkAPI) => {
        console.log(quiz.createdBy)
        await Axios.post("https://flashcards-api-zrei.onrender.com/createQuiz", {
            id: quiz.id, 
            topicId: quiz.topicId,
            name: quiz.name, 
            cardIds: quiz.cardIds,
            createdBy: quiz.createdBy
        })
    }

)


export const addQuizIdToDB = createAsyncThunk(
    "quizzes/addQuizId",
    async (quiz, thunkAPI) => {
        console.log('--------------------------------------------')
        console.log(quiz)
        Axios.put("https://flashcards-api-zrei.onrender.com/updateQuizIds", {
            _id: quiz._id, 
            id: quiz.id
        })
    }
)


const quizzesSlice = createSlice({
    name: 'quizzes', 
    initialState: {
        quizzes: {}
    },
    reducers: {
        addQuiz: (state, action) => {
            state.quizzes[action.payload.id] === undefined ? state.quizzes[action.payload.id] = {...action.payload} 
                : 
            state.quizzes[action.payload.id].push({...action.payload})
        }
    },

    extraReducers: {
        [loadQuizzes.fulfilled]: (state, action) => {
            state.quizzes = action.payload;
        },
        
        [addQuizToDB.fulfilled]: (state, action) => {
            
        },

    }

});

export const selectQuizzes = (state) => state.quizzes.quizzes


export const { addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;