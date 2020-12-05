const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(colum => new Column(colum));
  }

  toUpdate({ title = this.title, columns = this.columns }) {
    this.title = title;
    this.columns = columns.map(colum => new Column(colum));
  }
}

class Column {
  constructor({ id = uuid(), title = 'column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Board;
