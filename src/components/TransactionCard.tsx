import * as React from 'react';

import './TransactionCard.css';
import {TransactionCardProps} from "../types/types";



export function TransactionCard(props: TransactionCardProps) {
    const { transaction } = props;
    const myStyle = {
        top: (Math.floor(Math.random()*90)).toString() + 'vh',
        left: (Math.floor(Math.random()*74)).toString() + 'vw'
    };

    return (
        <React.Fragment>
            <div
                className="transactionCardDiv"
                style={myStyle}
            >
                <div className="transactionImageDiv">
                    <img src={transaction.imageUrl} alt={`Logo for ${transaction.title}`} className="transactionImage"/>
                </div>
                <div className="transactionTitleDiv">
                    {transaction.title}
                </div>
                <div className="transactionPriceDiv">
                    £{transaction.price/100}
                </div>
            </div>
        </React.Fragment>
    )
}

