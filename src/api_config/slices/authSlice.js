import { createSlice } from '@reduxjs/toolkit';

// Define the initial state based on the provided data structure
const initialState = {
    token: undefined,
    username: undefined,
    org_ids:[], 
    selectedOrgId:''

    // tags:[]
};

// Create the slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Define a reducer to update the state with new data
        setAuthToken(state, action) {
            console.log(action.payload, 'action.payload')
            const { access_token, user_id, organisations } = action.payload;
            state.token = access_token;
            state.username = '';
            state.org_ids = organisations;
        },

        setSelectedOrganization(state, action) {
        const { org_id } = action.payload;
        state.selectedOrgId = org_id
        }
        // You can add more reducers here for other actions if needed
    }
});

// Export the actions and reducer
export const { setAuthToken, setSelectedOrganization } = authSlice.actions;
export const authReducer = authSlice.reducer;
