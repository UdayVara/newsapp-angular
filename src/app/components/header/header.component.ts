import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    
  }

  @Input() bgMode = "";

  @Output() changeBg = new EventEmitter()
  @Output() categoryUpdate = new EventEmitter()

  updateBg(){
    this.changeBg.emit()
  }

  updateCategory(data:string){
    this.categoryUpdate.emit(data)
  }
}
