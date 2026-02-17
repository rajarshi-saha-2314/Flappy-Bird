export default class Score {
  constructor() {
    this.value = 0;
  }

  reset() {
    this.value = 0;
  }

  increase() {
    this.value++;
  }
}
