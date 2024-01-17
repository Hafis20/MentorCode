import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WalletService } from 'src/app/services/wallet.service';
import { getMenteeInfo } from 'src/app/store/Mentee/mentee.selector';

@Component({
  selector: 'app-mentee-dashboard',
  templateUrl: './mentee-dashboard.component.html',
  styleUrls: ['./mentee-dashboard.component.css'],
})
export class MenteeDashboardComponent implements OnInit {
  menteeId!: string;
  walletAmount!: number;
  constructor(private store: Store, private walletService: WalletService) {}

  ngOnInit(): void {
    this.store.select(getMenteeInfo).subscribe({
      next: (response) => {
        this.menteeId = response._id;
        if (this.menteeId) {
          this.getMenteeWalletAmount();
        }
      },
    });
  }

  getMenteeWalletAmount() {
    this.walletService.userWallet(this.menteeId).subscribe({
      next: (response) => {
        this.walletAmount = response.balance;
      },
    });
  }
}
