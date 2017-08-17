import { KfBaseClientPage } from './app.po';

describe('kf-base-client App', () => {
  let page: KfBaseClientPage;

  beforeEach(() => {
    page = new KfBaseClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
