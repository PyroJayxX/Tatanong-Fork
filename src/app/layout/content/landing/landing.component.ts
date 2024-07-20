import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FlashcardService } from '../../../service/flashcard.service';
import { FlashcardDeck, Card } from '../../../../types';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  constructor(private FlashcardService: FlashcardService) {}

  landingHeader: HTMLElement | null = null;
  landingSpan: HTMLElement | null = null;
  searchBar: HTMLElement | null = null;
  editBar: HTMLElement | null = null;
  createBar: HTMLElement | null = null;

  cards: Card[] = [];

  flashcardTemplate: FlashcardDeck = {
    title: '',
    searchID: '',
    editID: '',
    cards: this.cards,
  };

  toggleSearchBar() {
    this.landingHeader = document.getElementById('landing-header');
    this.landingSpan = this.landingHeader?.querySelector('span') as HTMLElement;
    this.searchBar = document.getElementById('search_bar');

    this.searchBar?.focus();
    this.landingSpan.style.color = '#f6cd35';
  }

  toggleEditBar() {
    this.editBar = document.getElementById('edit_bar');
    this.landingSpan = document
      .getElementById('landing-header')
      ?.querySelector('span') as HTMLElement;

    this.editBar?.focus();
    this.landingSpan.style.color = '#d13775';
  }

  toggleCreateBar() {
    this.createBar = document.getElementById('create_bar');
    this.landingSpan = document
      .getElementById('landing-header')
      ?.querySelector('span') as HTMLElement;

    this.createBar?.focus();
    this.landingSpan.style.color = '#26ace1';
  }

  fetchFlashcard(event: Event) {
    event.preventDefault();
    const searchID: string = (event.target as HTMLFormElement)['searchID']
      ?.value;
    const apiUrl: string = `http://localhost:5000/api/cardset/${searchID}`;

    this.FlashcardService.getFlashcardDeck(apiUrl, {}).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createFlashcard(event: Event) {
    event.preventDefault();
    this.flashcardTemplate.searchID = this.generateRandomId();
    this.flashcardTemplate.editID = this.generateRandomId();
    this.flashcardTemplate.title = (event.target as HTMLFormElement)[
      'flashcard_name'
    ]?.value;

    const apiUrl: string = `http://localhost:5000/api/new`;

    this.FlashcardService.addFlashcardDeck(
      apiUrl,
      this.flashcardTemplate
    ).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  generateRandomId(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters[randomIndex];
    }
    return randomId;
  }
}
