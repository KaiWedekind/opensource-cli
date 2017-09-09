function properties() {
  String.prototype.properties = function _properties() {
    return {
      value: this.toString(),
      length: this.length,
    };
  };
}

function left() {
  String.prototype.left = function _left(position) {
    return this.substring(0, position);
  };
}

function right() {
  String.prototype.right = function _right(position) {
    return this.substring(this.length - position);
  };
}

function endsWith() {
  String.prototype.endsWith = function _endsWith(chars) {
    return (chars) ? this.substring(this.length - chars.length).indexOf(chars) > -1 : false;
  };
}

function all() {
  properties();
  left();
  right();
  endsWith();
}

const main = {
  all,
  properties,
  left,
  right,
  endsWith,
};

export default main;
module.exports = main; // for CommonJS compatibility
