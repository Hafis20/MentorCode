import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { transaction_historyModel } from 'src/app/model/walletModel';

@Component({
  selector: 'transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnChanges{
  @Input() transaction_history!:transaction_historyModel[];
  currentPage:number = 1;
  itemsPerPage:number = 2;
  totalNoOfPage!:number;
  totalNoOfData!:number;
  show_transaction_history!:transaction_historyModel[];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['transaction_history']){
      if(this.transaction_history){
        this.totalNoOfData = this.transaction_history.length;
        this.findTotalPage();
        this.show_transaction_history = this.showTransactions();
      }
    }
  }
  
  findTotalPage(){
    this.totalNoOfPage = Math.ceil(this.totalNoOfData / this.itemsPerPage);
  }

  changePage(page:number){
    this.currentPage += page;
    this.show_transaction_history = this.showTransactions();
  }

  showTransactions():transaction_historyModel[]{
    if (this.transaction_history) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.transaction_history.slice(startIndex, endIndex);
    } else {
      return [];
    }
  }
}
