import { createSlice } from '@reduxjs/toolkit';

// Define the initial state based on the provided data structure
const initialState = {
    experience: 0, // Initialize with default or current value
    questionDict: {}, // Initialize with default or current value
    employeeId: '',
    solutionDict: {}
};

// Create the slice
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // Define a reducer to update the state with new data
        setData(state, action) {
            const { experience, questionDict, employeeId, solutionDict } = action.payload;
            state.experience = experience;
            state.questionDict = questionDict;
            state.employeeId = employeeId;
            state.solutionDict = solutionDict;
        },
        // You can add more reducers here for other actions if needed
    }
});

// Export the actions and reducer
export const { setData } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
