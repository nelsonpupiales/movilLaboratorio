import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExperimentoPage } from './experimento.page';

describe('ExperimentoPage', () => {
  let component: ExperimentoPage;
  let fixture: ComponentFixture<ExperimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
