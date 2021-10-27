import * as React from 'react';
import {TransactionCard} from "./TransactionCard";
import './TransactionContainer.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {Transaction} from "../types/types";



interface TransactionResponse {
    transactions: Array<Transaction>
}

function TransactionContainer() {
    const [transactionList, setTransactionList] = useState<Transaction[]>([]);


    useEffect(() => {

        const monzoToken = process.env.REACT_APP_MONZO_TOKEN as string;
        const monzoAccountId = process.env.REACT_APP_MONZO_ACCOUNT_ID as string;

        let config = {
            headers: {
                Authorization: `Bearer ${monzoToken}`,
            }
        }

        axios.get<TransactionResponse>(`https://api.monzo.com/transactions?expand[]=merchant&account_id=${monzoAccountId}&since=2021-10-01T00:00:00Z`, config)
            .then((res) => {
                setTransactionList(res.data.transactions);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <React.Fragment>
            <div className="transactionContainer">
                {transactionList.map((transaction: Transaction) => {
                    if (
                        transaction.scheme === 'mastercard' &&
                        Math.abs(transaction.amount) > 0 &&
                        transaction.amount < 0
                    ) {
                        return (<TransactionCard transaction={
                            {
                                title: transaction.merchant.name,
                                imageUrl: transaction.merchant.logo,
                                price: Math.abs(transaction.amount)
                            }
                        }/>)
                    } else {
                        return false;
                    }
                })}
            </div>
        </React.Fragment>
    )
}

export default TransactionContainer;
