import { PosAppPage } from './app.po';

describe('pos-app App', () => {
  let page: PosAppPage;

  beforeEach(() => {
    page = new PosAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
