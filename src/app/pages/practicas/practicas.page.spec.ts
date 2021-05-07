import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PracticasPage } from './practicas.page';

describe('PracticasPage', () => {
  let component: PracticasPage;
  let fixture: ComponentFixture<PracticasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PracticasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
