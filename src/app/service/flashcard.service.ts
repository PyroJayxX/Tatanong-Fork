import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})

export class FlashcardService {
  constructor(private apiService: ApiService) {}

  getFlashcardDeck = (url: string, params: any) => {
    return this.apiService.get(url, { params, responseType: 'json' });
  };

  addFlashcardDeck = (url: string, body: any) => {
    return this.apiService.post(url, body, {});
  };

  editFlashcardDeck = (url: string, body: any) => {
    return this.apiService.put(url, body, {});
  };

  deleteFlashcardDeck = (url: string) => {
    return this.apiService.delete(url, {});
  };
}

export const HOST_URL = 'http://tatanong-server.vercel.app';