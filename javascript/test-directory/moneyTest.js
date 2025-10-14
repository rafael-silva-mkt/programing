import { formatCents } from '../scripts/utils/money.js';

describe('Teste Suite: FormatCents', () => {
  it('Converts cents into dollars', () => {
    expect(formatCents(2095)).toEqual('$20.95');
  });

  it('Works with zero', () => {
    expect(formatCents(0)).toEqual('$0.00');
  });

  it('Rounds up to the nearest cent', () => {
    expect(formatCents(2000.5)).toEqual('$20.01');
  });

})
