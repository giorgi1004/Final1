import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider {
  slides = [
    { url: '1.jpg' }, 
    { url: '2.jpg' },
    { url: '3.jpg'}
  ];

  currentIndex = 0;

  setCurrentSlide(index: number) {
    this.currentIndex = index;
  }
}





