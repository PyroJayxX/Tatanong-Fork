import { ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlashcardService, HOST_URL } from '../../../service/flashcard.service';
import { FlashcardDeck } from '../../../../types';
import {
  NgbCarousel,
  NgbPaginationModule,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, NgbCarouselModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  searchID: string = '';
  flashcard: FlashcardDeck = {} as FlashcardDeck;
  page: number = 1;
  showNavigationIndicators: boolean = false;
  showDescription: boolean[] = [];
  isFlipped: boolean[] = [];

  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.searchID = this.route.snapshot.paramMap.get('searchID') as string;
    this.loadContent(this.searchID);
  }

  loadContent(searchID: string): void {
    const apiUrl: string = HOST_URL + `/api/cardset/search/${searchID}`;

    this.flashcardService.getFlashcardDeck(apiUrl, {}).subscribe({
      next: (data: any) => {
        this.ngZone.run(() => {
          this.flashcard = data;
          // Initialize arrays after data is loaded
          this.showDescription = new Array(this.flashcard.cards.length).fill(
            false
          );
          this.isFlipped = new Array(this.flashcard.cards.length).fill(false);
          this.changeDetector.detectChanges();
        });
      },
      error: (error) => {
        alert('Flashcard deck not found');
        console.log('HERE' + error);
      },
    });
  }

  toggleDescription(index: number) {
    this.showDescription[index] = !this.showDescription[index];
  }

  toggleFlip(index: number) {
    this.isFlipped[index] = !this.isFlipped[index];
  }

  updateCarousel() {
    const slideIndex = (this.page - 1) % this.flashcard.cards.length;
    this.carousel.select(slideIndex.toLocaleString()); // Directly pass slide index as a number
  }

  getPageSymbol(current: number) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
  }

  selectPage(pageString: string) {
    const page = parseInt(pageString, 10);
    if (!isNaN(page) && page > 0 && page <= this.flashcard.cards.length) {
      this.page = page;
      this.updateCarousel();
    }
  }

  formatInput(input: HTMLInputElement) {
    const value = parseInt(input.value, 10);
    if (value > 0 && value <= this.flashcard.cards.length) {
      input.value = value.toString();
    } else {
      input.value = this.page.toString();
    }
  }
}
