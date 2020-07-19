const { Readable } = require("stream");

class StreamFromArray extends Readable {
  constructor(array) {
    super({ objectMode: true });
    // super({ encoding: 'UTF-8' }); //string mode
    // super();//binary mode

    this.array = array;
    this.index = 0;
  }

  _read() {
    if (this.index <= this.array.length) {
      const chunk = {
        data: this.array[this.index],
        index: this.index,
      };

    //   const chunk = this.array[this.index]; //binary mode AND string mode
      this.push(chunk);
      this.index += 1;
    } else {
      this.push(null);
    }
  }
}

module.exports = StreamFromArray;
