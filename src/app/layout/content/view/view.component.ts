import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlashcardService } from '../../../service/flashcard.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {
  searchID: string = '';

  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.searchID = this.route.snapshot.paramMap.get('searchID') as string;
    this.loadContent(this.searchID);
  }

  loadContent(searchID: string): void {
    const apiUrl: string = `http://localhost:5000/api/cardset/search/${searchID}`;

    this.flashcardService.getFlashcardDeck(apiUrl, {}).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error) => {
        alert('Flashcard deck not found'); // TODO: Create a 404 page and redirect to it
        console.log(error);
      },
    });
  }
}
