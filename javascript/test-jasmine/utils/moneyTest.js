import { formatCents } from '../../scripts/utils/money.js';

describe('Test Suit: Format Cents', () => {

  it('Convert Cents into dollars', () => {
    expect(formatCents(2095)).toEqual('$20.95');
  });

  it('Works with 0', () => {
    expect(formatCents(0)).toEqual('$0.00');
  });

  it('Rounds correctly', () => {
    expect(formatCents(2000.5)).toEqual('$20.01');
  });

});


