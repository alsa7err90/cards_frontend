import { ActionTypes } from "../constants/action-types";

const initialState = {
    geteways : [] 
}

export const getewaysReducer  = (state = initialState, {type, payload}) => {
   
    switch (type) {
        case ActionTypes.ADD_GETEWAYS:
        console.log(payload);
            return { 
                geteways: payload,  
            }; 
        default:
            return state;
    };
};
 