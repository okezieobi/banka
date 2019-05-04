import randomId from 'unique-random';

export default class Numbers {
  static uniqueIds() {
    const uniqueIntger = randomId(1000000000000, 9000000000000);
    return uniqueIntger;
  }

  static accountNo() {
    const acctNumber = randomId(1000000000, 9000000000);
    return acctNumber;
  }
}
