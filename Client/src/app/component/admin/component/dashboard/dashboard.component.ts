import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WalletService } from 'src/app/services/wallet.service';
import { getAdminInfo } from '../../store/admin.selector';
import { AdminService } from '../../services/admin-service.service';
import { AgChartOptions } from 'ag-charts-community';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{
  adminId!:string;
  walletAmount!:number;
  totalMentors!:number;
  totalMentees!:number;
  bookingDetails!:any;
  public options:AgChartOptions = {};

  // Subscription
  walletSub$!:Subscription;
  getStatSub$!:Subscription;


  // Graph
  public optionsPie:AgChartOptions = {}

  constructor(
    private walletService:WalletService,
    private store:Store,
    private service:AdminService
  ){}

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
    this.walletSub$ = this.walletService.userWallet(this.adminId).subscribe({
      next:(response)=>{
        this.walletAmount = response.balance;
      }
    })
  }

  obj = [
    {
      month:'Jan',
      amount:1000
    },
    {
      month:'Feb',
      amount:5000
    },
    {
      month:'Mar',
      amount:650
    }
  ]

  getStatistics(){
    this.getStatSub$ = this.service.getStatistics().subscribe({
      next:(response)=>{
        this.totalMentors = response.noOfMentors;
        this.totalMentees = response.noOfMentees;
        this.bookingDetails = response.bookingDetails;
  
        this.options = {
          background:{
            visible: true, 
          },
          title:{
            text:'Earnings by Month'
          },
          data: this.obj,
          series: [
            {
                type: 'area',
                xKey: 'month',
                yKey: 'amount',
                yName: 'Bookings',
                stroke: 'blue',
                strokeWidth: 3,
                fill: 'lightBlue',
                marker: {
                    enabled: true,
                    fill: 'blue',
                },
            },
           
        ],
        }

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

  ngOnDestroy(): void {
    if(this.walletSub$){
      this.walletSub$.unsubscribe();
      this.getStatSub$.unsubscribe();
    }
  }
}
