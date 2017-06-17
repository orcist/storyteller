import { StorytellerPage } from './app.po';

describe('storyteller App', () => {
  let page: StorytellerPage;

  beforeEach(() => {
    page = new StorytellerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
