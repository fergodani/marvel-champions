import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayCardDialogComponent } from './play-card-dialog.component';

describe('PlayCardDialogComponent', () => {
  let component: PlayCardDialogComponent;
  let fixture: ComponentFixture<PlayCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayCardDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
