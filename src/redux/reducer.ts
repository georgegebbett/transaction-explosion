import {TransactionCardProps} from "../types/types";

type ActionType = {
    type: string,
    transactions?: TransactionCardProps[],
    total?: number,
    roundUpTotal?: number
};


export const roundUpReducer = (state = {}, action: ActionType) => {
    switch (action.type) {
        case "ADD_TRANSACTIONS":
            return {...state, transactions: action.transactions};
        default:
            return state;
    }
}

