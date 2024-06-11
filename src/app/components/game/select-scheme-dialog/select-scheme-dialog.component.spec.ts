import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSchemeDialogComponent } from './select-scheme-dialog.component';

describe('SelectSchemeDialogComponent', () => {
  let component: SelectSchemeDialogComponent;
  let fixture: ComponentFixture<SelectSchemeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSchemeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectSchemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
