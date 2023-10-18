import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
// import Math from '$GLOBAL$';
// import setInterval from '$GLOBAL$';
// import setTimeout from '$GLOBAL$';
// import SpeechSynthesisUtterance from '$GLOBAL$';
// import SpeechSynthesisUtterance from '$GLOBAL$';
// import clearInterval from '$GLOBAL$';
// import Number from '$GLOBAL$';

@Component({
  selector   : 'app-generate-random-number',
  templateUrl: './generate-random-number.component.html',
  styleUrls  : ['./generate-random-number.component.scss']
})
export class GenerateRandomNumberComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    let loadingVoices = setInterval(() => {
      console.log('loading voices...');
      // if (windowVoices.length > 1) {
      if (window.speechSynthesis.getVoices()) {
        Object.assign(this.voicesList, window.speechSynthesis.getVoices());
        // this.voicesList = windowVoices;
        clearInterval(loadingVoices);
      }
    }, 100);

    // setTimeout(() => {
    //   console.log(this.voicesList);
    //   let langIndex: number = 0;
    //   this.voicesList.forEach((voice: any) => {
    //     if (voice.lang.indexOf('IN') >= 0) {
    //       this.IndianLanguages.push({
    //         lang        : voice.lang,
    //         name        : voice.name,
    //         localService: voice.localService,
    //         index       : langIndex
    //       });
    //     }
    //     langIndex++;
    //   });
    //   this.loaded = true;
    // }, 2000);
    this.generateNumber();
  }

  ngOnInit(): void {
  }


  housieNumber: number                 = 0;
  numbers: any[]                       = [];
  housieNumbersList: number[]          = [];
  voicesList: any                      = [];
  loaded: boolean                      = false;
  markedNumbers: number[]              = [];
  clickCount: number                   = 0;
  generateNumberButtonClicked: boolean = false;

  // IndianLanguages: any                 = [];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    if (config.data) {
      this.housieNumbersList           = config.data.housieNumbersList;
      this.markedNumbers               = config.data.markedNumbers;
      this.loaded                      = config.data.loaded;
      this.generateNumberButtonClicked = config.data.generateNumberButtonClicked;
    }
  }

  // IndianLanguages: any                 = [];
  // selectedLanguageIndex: number        = 0;

  generateNumber() {
    this.loaded               = false;
    const randomIndex: number = Math.floor(Math.random() * this.housieNumbersList.length);

    let displayRandomNumbers = setInterval(() => {
      this.housieNumber = Math.floor(Math.random() * 90) + 1;
    }, 50);

    setTimeout(() => {

      // initializing Speech Synthesis Utterance

      let announceNumberInEnglish: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();

      this.housieNumber = this.housieNumbersList[randomIndex];
      this.housieNumbersList.splice(randomIndex, 1);

      clearInterval(displayRandomNumbers);
      if (this.housieNumbersList.length === 0) {
        this.loaded = false;
      }
      this.clickCount++;
      let announcementTextEnglish: string = '';
      const splitNumbers: number[]        = this.housieNumber.toString().split('').map(Number);
      this.markedNumbers.push(this.housieNumber);
      console.log(splitNumbers);
      if (splitNumbers.length !== 2) {
        announcementTextEnglish += ' single digit ';
      } else {
        splitNumbers.forEach((num: number) => {
          announcementTextEnglish += ` ${num} `;
        });
      }
      announcementTextEnglish += `, ${this.housieNumber}`;
      announceNumberInEnglish.text  = announcementTextEnglish;
      announceNumberInEnglish.voice = this.voicesList[92];
      window.speechSynthesis.speak(announceNumberInEnglish);

      let announceNumberInHindi: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
      let announcementTextHindi                           = '';
      if (splitNumbers.length !== 2) {
        announcementTextHindi += ' sirf';
      } else {
        splitNumbers.forEach((num: number) => {
          announcementTextHindi += ` ${num} `;
        });
      }
      announcementTextHindi += `, ${this.housieNumber}`;


      announceNumberInHindi.voice = this.voicesList[157];
      announceNumberInHindi.text  = announcementTextHindi;
      window.speechSynthesis.speak(announceNumberInHindi);

    }, 500);

    setTimeout(() => {
      this.loaded                      = true;
      this.generateNumberButtonClicked = false;
      this.ref.close({
        housieNumber               : this.housieNumber,
        housieNumbersList          : this.housieNumbersList,
        markedNumbers              : this.markedNumbers,
        loaded                     : this.loaded,
        generateNumberButtonClicked: this.generateNumberButtonClicked
      });
    }, 6500);
  }

}
