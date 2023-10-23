import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector   : 'app-setup-game',
  templateUrl: './setup-game.component.html',
  styleUrls  : ['./setup-game.component.scss']
})
export class SetupGameComponent implements OnInit {

  playersForm: FormGroup   = new FormGroup<any>({});
  singleTicketCost: number = 10;

  ngOnInit(): void {
    this.numberOfPlayers = this.totalPlayers;
    this.initiatePlayersForm();
  }

  initiatePlayersForm() {
    this.playersForm = this.fb.group({
      playersFormArray: this.fb.array([this.createPlayerInput(), this.createPlayerInput()])
    });
    this.calculateTotalAmount();
  }

  constructor(public messageService: MessageService, private fb: FormBuilder) {

  }

  totalPlayers: number = 2;

  // playersFormArray: any;

  createPlayerInput(): FormGroup {
    return this.fb.group({
      name            : new FormControl('', [Validators.required, Validators.minLength(2)]),
      numberOfTickets : new FormControl(this.minimumTickets, [Validators.required, Validators.min(1)]),
      amountForTickets: new FormControl(this.minimumTickets * this.singleTicketCost, [Validators.required, Validators.min(10)])
    });
  }

  get players() {
    return this.playersForm.get('playersFormArray') as FormArray;
  }

  addPlayer() {
    const playersFormArray = this.playersForm.get('playersFormArray') as FormArray;
    playersFormArray.push(this.createPlayerInput());
    this.totalPlayers = playersFormArray.length;
    this.calculateTotalAmount();
  }

  removePlayer(index: number) {
    const playersFormArray = this.playersForm.get('playersFormArray') as FormArray;
    if (playersFormArray.length > 2) {
      playersFormArray.removeAt(index);
    } else {
      this.messageService.clear();
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Minimum 2 players required'});
    }
    this.totalPlayers = playersFormArray.length;
    this.calculateTotalAmount();
  }


  changeNumberOfTickets(event: number, index: number) {
    console.log(event, index);
    const player = this.players.at(index);
    if (event >= this.minimumTickets) {
      player.get('amountForTickets')?.setValue(event * this.singleTicketCost);
    } else {
      this.messageService.clear();
      this.messageService.add({
        severity: 'error',
        summary : 'Error',
        detail  : `Minimum ${this.minimumTickets} tickets required`
      });
      setTimeout(() => {
        player.get('numberOfTickets')?.setValue(this.minimumTickets);
        player.get('amountForTickets')?.setValue(this.minimumTickets * this.singleTicketCost);
      }, 500);
    }
    this.calculateTotalAmount();
  }

  startGame() {
    console.log(this.playersForm.value);
  }

  numberOfPlayers: number = 0;

  changeNumberOfPlayers(numberOfPlayers: number) {
    if (numberOfPlayers > this.numberOfPlayers) {
      for (let x: number = 0; x < numberOfPlayers - this.numberOfPlayers; x++) {
        this.addPlayer();
      }
    }

    if (numberOfPlayers < 2) {
      this.messageService.clear();
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Minimum 2 players required'});
      setTimeout(() => {
        this.totalPlayers = 2;
        this.initiatePlayersForm();
      }, 500);
    }

    if (numberOfPlayers < this.numberOfPlayers) {
      for (let x: number = 0; x < this.numberOfPlayers - numberOfPlayers; x++) {
        this.removePlayer(this.numberOfPlayers - 1);
      }
    }
    this.numberOfPlayers = this.totalPlayers;
    this.calculateTotalAmount();
  }

  minimumTickets: number = 1;
  maximumTickets: number = 30;

  setMinimumTickets(numberOfTickets: number) {
    const playersFormArray = this.playersForm.get('playersFormArray') as FormArray;
    playersFormArray.controls.forEach((player: any,) => {
      player.get('numberOfTickets').setValue(numberOfTickets);
      player.get('amountForTickets').setValue(this.singleTicketCost * numberOfTickets);
    });
    this.calculateTotalAmount();
  }


  setTicketCost(cost: number) {
    if (cost > 10) {
      this.singleTicketCost = cost;
      console.log('players', this.playersForm.value.playersFormArray);
      const playersFormArray = this.playersForm.get('playersFormArray') as FormArray;
      playersFormArray.controls.forEach((player: any,) => {
        player.get('amountForTickets').setValue(cost * player.get('numberOfTickets').value);
      });
    } else {
      this.messageService.clear();
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Minimum ticket cost is ₹10'});
      setTimeout(() => {
        this.singleTicketCost = 10;
      }, 500);
    }
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    const playersFormArray = this.playersForm.get('playersFormArray') as FormArray;
    this.totalAmount       = 0;
    playersFormArray.controls.forEach((player: any,) => {
      this.totalAmount += player.get('amountForTickets').value;
    });

    this.fast5Prize        = Math.floor(this.totalAmount * 0.1);
    this.linesPrize         = Math.ceil(this.totalAmount * 0.3);
    this.singleLinePrize   = Math.floor(this.linesPrize / 3);

    this.firstHousiePrize  = Math.floor(this.totalAmount * 0.40);
    this.secondHousiePrize = Math.floor(this.totalAmount * 0.20);
    this.remainingAmount   = this.totalAmount - (this.fast5Prize + this.linesPrize + this.secondHousiePrize + this.firstHousiePrize);
  }

  totalAmount: number       = 0;
  fast5Prize: number        = 0;
  linesPrize: number         = 0;
  singleLinePrize: number   = 0;
  secondHousiePrize: number = 0;
  firstHousiePrize: number  = 0;
  remainingAmount: number   = 0;

  // fast5Prize = totalAmount * 0.2
  // linesPrize = totalAmount * 0.3
  // secondHousiePrize = totalAmount * 0.15
  // firstHousiePrize = totalAmount * 0.25
  // remainingAmount = totalAmount - (fast5Prize + linesPrize + secondHousiePrize + firstHousiePrize)


}
