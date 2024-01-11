// Taking the wallet amount and transaction history of the user
export interface GetWallet{
   balance:number,
   transactionHistory:transactionHistoryModel[];
}

export interface transactionHistoryModel{
   amount:number;
   dateOfTransaction:Date;
}