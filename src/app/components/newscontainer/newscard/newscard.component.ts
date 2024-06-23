import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { newsType } from '../newscontainer.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-newscard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newscard.component.html',
  styleUrl: './newscard.component.css'
})

export class NewscardComponent implements OnInit {
  @Input() news:newsType| undefined;
  @Input() bgMode = "";

  ngOnInit(): void {
    
  }


  
}
