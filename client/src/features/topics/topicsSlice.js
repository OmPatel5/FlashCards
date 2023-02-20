import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";


export const loadTopics = createAsyncThunk(
    "topics/getAllTopics", 
    async () => {
        let topicObj = {}
        await Axios.get("https://flashcards-api-zrei.onrender.com/getTopics").then((response) => {
            for (let topic in response.data) {
                topicObj[response.data[topic].id] = {
                    _id: response.data[topic]._id,
                    id: response.data[topic].id,
                    name: response.data[topic].name,
                    icon: response.data[topic].icon,
                    quizIds: response.data[topic].quizIds,
                };
            }
        })

        return topicObj;
    }
)

export const addTopicToDB = createAsyncThunk(
    "topics/addTopic", 
    async (topic, thunkAPI) => {
        Axios.post("https://flashcards-api-zrei.onrender.com/createTopic", {
            id: topic.id, 
            name: topic.name,
            icon: topic.icon, 
            quizIds: topic.quizIds,
        })
    }

)


const topicsSlice = createSlice({
    name: 'topics', 
    initialState: {
        topics: {}
    },
    reducers: {
        addTopic: (state, action) => {
            console.log(state.topics)
            state.topics[action.payload.id] === undefined ? state.topics[action.payload.id] = {...action.payload, quizIds: []} 
                : 
            state.topics[action.payload.id].push({...action.payload, quizIds: []})
            console.log(state.topics)

        },

        addQuizId: (state, action) => {
            state.topics[action.payload.topicId].quizIds.push(action.payload.id);

        }
    },

    extraReducers: {
        [loadTopics.fulfilled]: (state, action) => {
            state.topics = action.payload;
        },
        
        [addTopicToDB.fulfilled]: (state, action) => {
            console.log(action)
        },

    }

});

export const selectTopics = (state) => state.topics.topics


export const { addTopic, addQuizId } = topicsSlice.actions;
export default topicsSlice.reducer;

