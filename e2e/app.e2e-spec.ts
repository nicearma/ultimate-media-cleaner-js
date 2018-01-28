import { UcmPage } from './app.po';

describe('umc App', () => {
  let page: UcmPage;

  beforeEach(() => {
    page = new UcmPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
