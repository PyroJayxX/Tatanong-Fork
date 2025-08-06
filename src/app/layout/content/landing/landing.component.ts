import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FlashcardService, HOST_URL } from '../../../service/flashcard.service';
import { FlashcardDeck, Card } from '../../../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  constructor(
    private flashcardService: FlashcardService,
    private router: Router
  ) {}

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

  fetchFlashcard(searchID: string) {
    const apiUrl: string = HOST_URL + `/api/cardset/search/${searchID}`;

    this.flashcardService.getFlashcardDeck(apiUrl, {}).subscribe({
      next: (data: any) => {
        this.passToView(searchID);
      },
      error: (error) => {
        alert('Flashcard deck not found'); // TODO: Create a 404 page and redirect to it
        console.log(apiUrl);
        console.log(error);
      },
    });
  }

  passToView(searchID: string) {
    this.router.navigate(['/view', searchID]);
  }

  passToConstruct(editID: string) {
    this.router.navigate(['/construct', editID]);
  }

  checkSearchID(searchID: string): Promise<boolean> {
    const apiUrl: string = HOST_URL + `/api/cardset/search/${searchID}`;

    return new Promise((resolve) => {
      this.flashcardService.getFlashcardDeck(apiUrl, {}).subscribe({
        next: (data: any) => {
          resolve(true); // ID exists
        },
        error: (error) => {
          resolve(false); // ID does not exist
        },
      });
    });
  }

  checkEditID(editID: string): Promise<boolean> {
    const apiUrl: string = HOST_URL + `/api/cardset/edit/${editID}`;

    return new Promise((resolve) => {
      this.flashcardService.getFlashcardDeck(apiUrl, {}).subscribe({
        next: (data: any) => {
          resolve(true); // ID exists
        },
        error: (error) => {
          resolve(false); // ID does not exist
        },
      });
    });
  }

  async createFlashcard(flashcardName: string) {
    let isUnique: boolean = false;

    do {
      this.flashcardTemplate.searchID = this.generateRandomId(6);
      this.flashcardTemplate.editID = this.generateRandomId(8);

      const [searchIDExists, editIDExists] = await Promise.all([
        this.checkSearchID(this.flashcardTemplate.searchID),
        this.checkEditID(this.flashcardTemplate.editID),
      ]);

      isUnique = !searchIDExists && !editIDExists;
    } while (!isUnique);

    this.flashcardTemplate.title = flashcardName;

    const apiUrl: string = HOST_URL + `/api/new`;

    this.flashcardService
      .addFlashcardDeck(apiUrl, this.flashcardTemplate)
      .subscribe({
        next: (data) => {
          this.passToConstruct(this.flashcardTemplate.editID);
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  generateRandomId(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters[randomIndex];
    }
    return randomId;
  }
}
