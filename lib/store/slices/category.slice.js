import { createSelector, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
    categories: {},
    votes: {},
    votingFeedback: "",
    votingError: "",
    graduatesSubmit: false,
    generalSubmit: false,
    undergraduatesSubmit: false,
    loading: false
}

const updateOrAddVote = (votes, award, nominee) => {
    votes[award] = nominee; // Directly set the award's nominee
}

const handleSubmit = (endpoint) => {
    switch (endpoint) {
      case 'graduate':
        dispatch(setGraduatesSubmitTrue());
        break;
      case 'general':
        dispatch(setGeneralSubmitTrue());
        break;
      case 'undergraduate':
        dispatch(setUndergraduatesSubmitTrue());
        break;
      default:
        console.warn(`Unknown endpoint: ${endpoint}`);
        break;
    }
  };

export const sendVotes = createAsyncThunk(
    "categories/uploadVotes",
    async({votes, categoryEndpoint, token}, {rejectWithValue, dispatch}) => {
        try {
            // Send votes to server
            // For now, we'll just return a mock response
            const url = `https://ules-awards-323191032ef6.herokuapp.com/vote/${categoryEndpoint}`
            const response = await axios.post(url, { votes }, {
                headers: {
                    authorization: token
                }
            });
            console.log(response.data.message)
            if (categoryEndpoint === 'graduate') {
                dispatch(setGraduatesSubmitTrue());
            } else if (categoryEndpoint === 'general') {
                dispatch(setGeneralSubmitTrue());
            } else if (categoryEndpoint === 'undergraduate') {
                dispatch(setUndergraduatesSubmitTrue());
            }

            return "Votes submited"
        } catch (error) {
            console.error(error.response.data.error);
            if(error?.response?.data?.error){

                return rejectWithValue(error.response.data.error);
            }

            return rejectWithValue("could not submit your votes at this time");
        }
    }
)

const categorySlice = createSlice({
    name: 'categories',
    initialState: INITIAL_STATE,
    reducers: {
        addCategory: (state, action) => {
            state.categories[action.payload.id] = action.payload;
        },
        addVote: (state, action) => {
            state.votes[action.payload.id] = action.payload.nomineeID;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        clearVotes: (state, action) => {
            state.votes = {}; // Clear all votes
            // votingError = action.payload;
        },
        clearMessages: (state, action) => {
            state.votingFeedback = "";
            state.votingError = "";
        },   
        setGraduatesSubmitTrue(state) {
            state.graduatesSubmit = true;
        },
        setGeneralSubmitTrue(state) {
             state.generalSubmit = true;
        },
        setUndergraduatesSubmitTrue(state) {
             state.undergraduatesSubmit = true;
        },

    },

    extraReducers: (builder) => {
        builder
            .addCase(sendVotes.fulfilled, (state, action) => {
                // If the votes were sent successfully, clear the votes
                state.votes = {};
                state.votingFeedback = action.payload
                state.loading = false;

            })
            .addCase(sendVotes.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(sendVotes.rejected, (state, action) => {
                state.loading = false;
                state.votingError = action.payload;
            }
        )
    }
})



export const { addCategory, addVote, setCategories, clearMessages, clearVotes, setGraduatesSubmitTrue, setGeneralSubmitTrue, setUndergraduatesSubmitTrue } = categorySlice.actions;

export const categories = categorySlice.reducer;


const selectCategoriesState = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState.categories
);

export const selectVotes = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState.votes
);

export const selectGeneralCategory = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState.categories.general
);

// Selector to get the 'graduate' category
export const selectGraduateCategory = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState.categories.graduate
);

// Selector to get the 'undergraduate' category
export const selectUndergraduateCategory = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState.categories.undergraduate
);

export const selectVotingFeedback = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState.votingFeedback
);

// Selector for votingError
export const selectVotingError = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState.votingError
);

export const selectGraduatesSubmit = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState.graduatesSubmit
);

// Selector for generalSubmit
export const selectGeneralSubmit = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState.generalSubmit
);

// Selector for undergraduatesSubmit
export const selectUndergraduatesSubmit = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState.undergraduatesSubmit
);

export const selectLoading = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState.loading
);