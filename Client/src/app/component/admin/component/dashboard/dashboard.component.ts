import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WalletService } from 'src/app/services/wallet.service';
import { getAdminInfo } from '../../store/admin.selector';
import { AdminService } from '../../services/admin-service.service';
import { Statistics } from 'src/app/model/adminModel';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  adminId!:string;
  walletAmount!:number;
  totalMentors!:number;
  totalMentees!:number;
  bookingDetails!:any;


  // Graph
  public optionsPie:AgChartOptions = {}

  constructor(private walletService:WalletService,private store:Store,private service:AdminService){}

  ngOnInit(): void {
    this.store.select(getAdminInfo).subscribe({
      next:(response)=>{
        this.adminId = response._id;
        if(this.adminId){
          this.getWalletAmount();
          this.getStatistics();
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

  getStatistics(){
    this.service.getStatistics().subscribe({
      next:(response)=>{
        this.totalMentors = response.noOfMentors;
        this.totalMentees = response.noOfMentees;
        this.bookingDetails = response.bookingDetails;
  
        this.optionsPie = {
          background: {
            visible: true,
          },
          title: {
            text: 'Booking Status',
          },
          data: this.bookingDetails,
          series: [
            {
              type: 'pie',
              angleKey: 'count',
              legendItemKey: '_id',
            },
          ],
          legend: {
            enabled: true,
          },
        };
        
      },
      error:(error)=>{
        console.log(error.error.message);
      }
    });
    
  }
}
