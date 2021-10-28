export interface Transaction {
    merchant: {
        name: string,
        logo: string
    },
    amount: number,
    scheme: string,
    id: string
}

