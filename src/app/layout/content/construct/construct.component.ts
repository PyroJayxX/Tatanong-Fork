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
  selector: 'app-construct',
  standalone: true,
  imports: [],
  templateUrl: './construct.component.html',
  styleUrl: './construct.component.scss',
})
export class ConstructComponent {
  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private changeDetector: ChangeDetectorRef
  ) {}
}
