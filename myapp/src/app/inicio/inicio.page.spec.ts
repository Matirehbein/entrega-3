import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioPage } from './inicio.page';
import { async } from '@angular/core/testing';
describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
