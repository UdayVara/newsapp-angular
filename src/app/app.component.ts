import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { CommonModule } from '@angular/common';
import { NewscontainerComponent } from "./components/newscontainer/newscontainer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, CommonModule, NewscontainerComponent]
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    
  }
  title = 'newzapp-angular';

  bgMode = "light";

  category = "general"

  changeBgMode(){
    if(this.bgMode == "light"){
      this.bgMode = "dark"
      document.body.style.backgroundColor = "#393940"
    }else{
      this.bgMode = "light"
      document.body.style.backgroundColor = "white"
    }
  }

  changeCategory(data:string){
    this.category = data
  }

  printCategory(){
    console.debug("Category",this.category)
  }
}
