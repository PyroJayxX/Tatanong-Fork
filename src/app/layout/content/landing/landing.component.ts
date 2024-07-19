import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
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
}
