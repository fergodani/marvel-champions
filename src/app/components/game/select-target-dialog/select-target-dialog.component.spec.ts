import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTargetDialogComponent } from './select-target-dialog.component';

describe('SelectTargetDialogComponent', () => {
  let component: SelectTargetDialogComponent;
  let fixture: ComponentFixture<SelectTargetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTargetDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectTargetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
