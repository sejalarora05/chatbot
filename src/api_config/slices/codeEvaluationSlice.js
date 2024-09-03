import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    employeeId: '',
    codingQuestion: '',
    timeAllotted: '',
};

const codeEvaluationSlice = createSlice({
    name: 'codeEvaluation',
    initialState,
    reducers: {
        setCodeEvaluationData(state, action) {
            const { employee_id, generatedCodingQuestion, time_alloted } = action.payload;
            state.employeeId = employee_id;
            state.codingQuestion = generatedCodingQuestion;
            state.timeAllotted = time_alloted;
        },
    },
});

export const { setCodeEvaluationData } = codeEvaluationSlice.actions;
export const codeEvaluationReducer = codeEvaluationSlice.reducer;
