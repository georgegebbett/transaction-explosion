import * as React from 'react';

import './TransactionCard.css';

interface TransactionCardProps {
    transaction: {
        title: string,
        imageUrl: string,
        price: number,
        index: number,
        fullLength: number
    }
}

export function TransactionCard(props: TransactionCardProps) {
    const { transaction } = props;
    const hideTime: number = (transaction.fullLength *0.1 + 0.5)
    const myStyle = {
        animationDelay: ((transaction.fullLength - transaction.index) * 0.1).toString() + 's, ' + hideTime.toString() + 's',
        zIndex: transaction.fullLength - transaction.index
    };

    return (
        <React.Fragment>
            <div
                className="transactionCardDiv"
                style={myStyle}
            >
                <div className="transactionImageDiv">
                    <img src={transaction.imageUrl} className="transactionImage"/>
                </div>
                <div
                    className="transactionTitleDiv"
                >
                    {transaction.title}
                </div>
                <div
                    className="transactionPriceDiv"
                >
                    £{transaction.price/100}
                </div>
            </div>
        </React.Fragment>
    )
}

