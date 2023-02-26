import { ActionTypes } from "../constants/action-types"

export const setGateways = (list) => {
    console.log(list)
    return {
        type : ActionTypes.ADD_GETEWAYS,
        payload : list
    };
};
 