// Taking the wallet amount and transaction history of the user
export interface GetWallet{
   balance:number,
   transaction_history:transaction_historyModel[];
}

export interface transaction_historyModel{
   amount:number;
   date_of_transaction:Date;
}