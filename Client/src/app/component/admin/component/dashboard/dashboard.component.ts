import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WalletService } from 'src/app/services/wallet.service';
import { getAdminInfo } from '../../store/admin.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  adminId!:string;
  walletAmount!:number;
  constructor(private walletService:WalletService,private store:Store){}

  ngOnInit(): void {
    this.store.select(getAdminInfo).subscribe({
      next:(response)=>{
        this.adminId = response._id;
        if(this.adminId){
          this.getWalletAmount();
        }
      }
    })
  }

  getWalletAmount(){
    this.walletService.userWallet(this.adminId).subscribe({
      next:(response)=>{
        this.walletAmount = response.balance;
      }
    })
  }
}
