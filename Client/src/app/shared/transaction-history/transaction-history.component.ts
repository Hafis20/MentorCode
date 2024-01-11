import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { transactionHistoryModel } from 'src/app/model/walletModel';

@Component({
  selector: 'transaction-history',
  templateUrl:'./transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnChanges{
  @Input() transactionHistory!:transactionHistoryModel[];
  currentPage:number = 1;
  itemsPerPage:number = 4;
  totalNoOfPage!:number;
  totalNoOfData!:number;
  showTransactionHistory!:transactionHistoryModel[];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['transactionHistory']){
      if(this.transactionHistory){
        // console.log(this.transactionHistory,'dahaohfdjikjiffffffffff');
        this.totalNoOfData = this.transactionHistory.length;
        this.findTotalPage();
        this.showTransactionHistory = this.showTransactions();
      }
    }
  }
  
  findTotalPage(){
    this.totalNoOfPage = Math.ceil(this.totalNoOfData / this.itemsPerPage);
  }

  changePage(page:number){
    this.currentPage += page;
    this.showTransactionHistory = this.showTransactions();
  }

  showTransactions():transactionHistoryModel[]{
    if (this.transactionHistory) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.transactionHistory.slice(startIndex, endIndex);
    } else {
      return [];
    }
  }
}
