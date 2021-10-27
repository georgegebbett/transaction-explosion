import * as React from 'react';
import TransactionCard from "./TransactionCard";
import './TransactionContainer.css';
import {useEffect, useState} from "react";
import axios from "axios";


function TransactionContainer() {
    const [transactionList, setTransactionList] = useState([]);
    const monzoToken = process.env.MONZO_TOKEN;
    const monzoAccountId = process.env.MONZO_ACCOUNT_ID;

    useEffect(() => {

        let config = {
            headers: {
                Authorization: `Bearer ${monzoToken}`,
            }
        }

        axios.get(`https://api.monzo.com/transactions?expand[]=merchant&account_id=${monzoAccountId}&since=2021-10-01T00:00:00Z`, config)
            .then((res) => {
                setTransactionList(res.data.transactions);
                console.log(res.data)
            })
    }, [])


    return (
        <React.Fragment>
            <div className="transactionContainer">
                {transactionList.map(transaction => {
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
                    }
                })}
            </div>
        </React.Fragment>
    )
}

export default TransactionContainer;
