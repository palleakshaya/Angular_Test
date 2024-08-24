import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductdialogComponent } from './addproductdialog.component';

describe('AddproductdialogComponent', () => {
  let component: AddproductdialogComponent;
  let fixture: ComponentFixture<AddproductdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddproductdialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddproductdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
