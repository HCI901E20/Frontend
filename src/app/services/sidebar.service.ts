import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  expandOverview = true;
  expandLivefeed = false;

  constructor() { }

  toggleOverview(): void {
    this.expandOverview = !this.expandOverview;
  }

  toggleLivefeed(): void {
    this.expandLivefeed = !this.expandLivefeed;
  }
}
