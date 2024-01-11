import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgChartOptions } from 'ag-charts-community';
import { transactionHistoryModel } from 'src/app/model/walletModel';
import { MentorService } from 'src/app/services/mentor.service';
import { WalletService } from 'src/app/services/wallet.service';
import { getMentorInfo } from 'src/app/store/Mentor/mentor.selector';

@Component({
  selector: 'app-mentor-dashboard',
  templateUrl: './mentor-dashboard.component.html',
  styleUrls: ['./mentor-dashboard.component.css'],
})
export class MentorDashboardComponent implements OnInit {
  mentorId!: string;
  walletAmount: number = 0;
  totalSessions!: number;
  bookingDetails: any;
  transactionHistory!:transactionHistoryModel[];


  public pieOptions: AgChartOptions = {};

  constructor(
    private walletService: WalletService,
    private store: Store,
    private service: MentorService
  ) {}
  ngOnInit(): void {
    this.store.select(getMentorInfo).subscribe({
      // For getting the id from store
      next: (response) => {
        this.mentorId = response._id;
        if (this.mentorId) {
          this.getWalletAmount();
          this.getStatistics();
        }
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  getWalletAmount() {
    this.walletService.userWallet(this.mentorId).subscribe({
      next: (response) => {
        this.walletAmount = response.balance;
        this.transactionHistory = response.transactionHistory;
      },
    });
  }

  getStatistics() {
    this.service.getStatistics().subscribe({
      next: (response) => {
        this.totalSessions = response.totalSessions;
        this.bookingDetails = response.bookings;

        this.pieOptions = {
          background: {
            visible: true,
          },
          title: {
            text: 'Bookings',
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
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
}
