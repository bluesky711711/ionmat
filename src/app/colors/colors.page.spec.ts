import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColorsPage } from './colors.page';

describe('ColorsPage', () => {
  let component: ColorsPage;
  let fixture: ComponentFixture<ColorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
