import * as React from 'react';
import {TransactionCard} from "./TransactionCard";
import './TransactionContainer.css';
import {ReactElement, useEffect, useState} from "react";
import axios from "axios";
import {Transaction} from "../types/types";



interface TransactionResponse {
    transactions: Array<Transaction>
}

function TransactionContainer() {
    const [transactionCardList, setTransactionCardList] = useState<ReactElement[]>([]);
    const [totalSpent, setTotalSpent] = useState<number>(0);
    const [totalRoundUp, setTotalRoundUp] = useState<number>(0);


    useEffect(() => {
        setTotalSpent(0);
        setTotalRoundUp(0);

        const monzoToken = process.env.REACT_APP_MONZO_TOKEN as string;
        const monzoAccountId = process.env.REACT_APP_MONZO_ACCOUNT_ID as string;

        let config = {
            headers: {
                Authorization: `Bearer ${monzoToken}`,
            }
        }

        axios.get<TransactionResponse>(`https://api.monzo.com/transactions?expand[]=merchant&account_id=${monzoAccountId}&since=2021-10-01T00:00:00Z`, config)
            .then((res) => {
                const { transactions } = res.data;

                const txnCardList = transactions.filter((transaction: Transaction) => {
                    if (
                        transaction.scheme === 'mastercard' &&
                        Math.abs(transaction.amount) > 0 &&
                        transaction.amount < 0
                    ) {
                        return true
                    } else {
                        return false
                    }
                }).map((transaction: Transaction, index: number, fullArr: Array<Transaction>) => {
                    setTotalSpent((prevState => prevState + Math.abs(transaction.amount)));
                    setTotalRoundUp((prevState => prevState + (100 - (Math.abs(transaction.amount) % 100))))
                    return (<TransactionCard key={transaction.id} transaction={
                        {
                            title: transaction.merchant.name,
                            imageUrl: transaction.merchant.logo,
                            price: Math.abs(transaction.amount),
                            index: index,
                            fullLength: fullArr.length
                        }
                    }/>)
                })

                setTransactionCardList(txnCardList);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <React.Fragment>
            <div className="transactionContainer">
                <div className="informationContainer">
                    <div
                        id="spentFigure"
                        style={{animationDelay: (transactionCardList.length * 0.1 + 1.5).toString() + 's'}}
                    >
                        Total spent: £{totalSpent / 100}
                    </div>
                    <div
                        id="roundFigure"
                        style={{animationDelay: (transactionCardList.length * 0.1 + 4.5).toString() + 's'}}
                    >
                        Total round up: £{totalRoundUp / 100}
                    </div>
                    <div
                        id="roundComplete"
                        style={{animationDelay: (transactionCardList.length * 0.1 + 7.5).toString() + 's'}}
                    >
                        Round up complete
                    </div>
                </div>
                {transactionCardList}
            </div>
        </React.Fragment>
    )
}

export default TransactionContainer;
