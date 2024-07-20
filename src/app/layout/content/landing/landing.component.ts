import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FlashcardService } from '../../../service/flashcard.service';

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
    this.searchBar = document.getElementById('search_bar');
    const searchID: string = (event.target as HTMLFormElement)['searchID']
      ?.value;
    const testString: string = `http://localhost:5000/api/cardset/${searchID}`;

    this.FlashcardService.getFlashcardDeck(testString, {}).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
