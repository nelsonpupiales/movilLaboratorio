import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TemaPage } from './tema.page';

describe('TemaPage', () => {
  let component: TemaPage;
  let fixture: ComponentFixture<TemaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
