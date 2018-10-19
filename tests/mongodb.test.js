const accountDb = require('../api/db/account');

let fakeAccountData;

beforeAll(() => {
  fakeAccountData = {
    name: 'Test Name',
    amount: 1234,
    spenders: null
  };
});

describe("MongoDB functions tests", () => {
  describe("Create Account", () => {
    test('Create account OK', () => {
      accountDb.create(fakeAccountData).then(result => {
        expect(result).toBeTruthy();
      })
    });
  });
});