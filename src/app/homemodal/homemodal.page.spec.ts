import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomemodalPage } from './homemodal.page';

describe('HomemodalPage', () => {
  let component: HomemodalPage;
  let fixture: ComponentFixture<HomemodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomemodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomemodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
