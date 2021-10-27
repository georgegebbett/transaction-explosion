import { connect } from 'react-redux';
import { TransactionContainer } from './TransactionContainer';
import {TransactionCardProps} from "../types/types";

const mapStateToProps = (state: {transactions: Array<TransactionCardProps>}) => {
    return {
        transactions: state.transactions
    };
};
// @ts-ignore
const mapDispatchToProps = (dispatch) => {
    return {
        handleAddingTransactions: (transactions: Array<TransactionCardProps>) => dispatch({ type: 'ADD_TRANSACTIONS', transactions })
    }
};
export const Container = connect(mapStateToProps, mapDispatchToProps)(TransactionContainer);