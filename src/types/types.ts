export interface Transaction {
    merchant: {
        name: string,
        logo: string
    },
    amount: number,
    scheme: string
}

export interface TransactionCardProps {
    transaction: {
        title: string,
        imageUrl: string,
        price: number
    }
}