import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wallet-card',
  templateUrl: './wallet-amount-card.component.html',
  styleUrls: ['./wallet-amount-card.component.css']
})
export class WalletAmountCardComponent implements OnInit{
  @Input() walletAmount!:number;
  constructor(){}
  ngOnInit(): void {
    
  }

}
