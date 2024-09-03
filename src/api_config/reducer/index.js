import { combineReducers } from "redux";

import api, { api2, api3 } from "..";
import mockInterviewSlice from "../slices/mockInterviewSlice";
import { dataReducer } from "../slices/technicalQuestionSlice";
import { codeEvaluationReducer } from "../slices/codeEvaluationSlice";
import { authReducer } from "../slices/authSlice";
const rootReducer = combineReducers({
  mockInterviewSlice,
  data: dataReducer,
  codeEvaluation: codeEvaluationReducer,
  auth:authReducer,
  [api.reducerPath]: api.reducer,
  [api2.reducerPath]: api2.reducer,
  [api3.reducerPath]: api3.reducer,
});

export default rootReducer;
