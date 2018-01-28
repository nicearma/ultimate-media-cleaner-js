import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalPage } from './principal.page';

describe('PrincipalPage', () => {
  let component: PrincipalPage;
  let fixture: ComponentFixture<PrincipalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
