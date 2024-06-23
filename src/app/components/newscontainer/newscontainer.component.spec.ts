import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewscontainerComponent } from './newscontainer.component';

describe('NewscontainerComponent', () => {
  let component: NewscontainerComponent;
  let fixture: ComponentFixture<NewscontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewscontainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewscontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
