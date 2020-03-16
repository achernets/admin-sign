//
// Autogenerated by Thrift Compiler (0.13.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
if (typeof Int64 === 'undefined' && typeof require === 'function') {
  const Int64 = require('node-int64');
}


FilterFieldType = {
  'STRING' : 0,
  'NUMBER' : 1,
  'DATE' : 2,
  'BOOLEAN' : 3,
  'ENUMERATED' : 4,
  'DOUBLE' : 5,
  'STRING_FOR_REPLACE' : 6
};
FilterCondition = {
  'EQUAL' : 0,
  'NOT_EQUAL' : 1,
  'CONTAIN' : 2,
  'NOT_CONTAIN' : 3,
  'LESS' : 4,
  'LESS_OR_EQUAL' : 5,
  'MORE' : 6,
  'MORE_OR_EQUAL' : 7,
  'IN' : 8,
  'NOT_IN' : 9,
  'NULL' : 10,
  'NOT_NULL' : 11,
  'BETWEEN' : 12,
  'SEMANTIC_ANY' : 13
};
FilterItem = class {
  constructor(args) {
    this.field = null;
    this.fType = null;
    this.condition = null;
    this.value = null;
    this.additionValue = null;
    if (args) {
      if (args.field !== undefined && args.field !== null) {
        this.field = args.field;
      }
      if (args.fType !== undefined && args.fType !== null) {
        this.fType = args.fType;
      }
      if (args.condition !== undefined && args.condition !== null) {
        this.condition = args.condition;
      }
      if (args.value !== undefined && args.value !== null) {
        this.value = args.value;
      }
      if (args.additionValue !== undefined && args.additionValue !== null) {
        this.additionValue = args.additionValue;
      }
    }
  }

  read (input) {
    input.readStructBegin();
    while (true) {
      const ret = input.readFieldBegin();
      const ftype = ret.ftype;
      const fid = ret.fid;
      if (ftype == Thrift.Type.STOP) {
        break;
      }
      switch (fid) {
        case 1:
        if (ftype == Thrift.Type.STRING) {
          this.field = input.readString().value;
        } else {
          input.skip(ftype);
        }
        break;
        case 2:
        if (ftype == Thrift.Type.I32) {
          this.fType = input.readI32().value;
        } else {
          input.skip(ftype);
        }
        break;
        case 3:
        if (ftype == Thrift.Type.I32) {
          this.condition = input.readI32().value;
        } else {
          input.skip(ftype);
        }
        break;
        case 4:
        if (ftype == Thrift.Type.STRING) {
          this.value = input.readString().value;
        } else {
          input.skip(ftype);
        }
        break;
        case 5:
        if (ftype == Thrift.Type.STRING) {
          this.additionValue = input.readString().value;
        } else {
          input.skip(ftype);
        }
        break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
    input.readStructEnd();
    return;
  }

  write (output) {
    output.writeStructBegin('FilterItem');
    if (this.field !== null && this.field !== undefined) {
      output.writeFieldBegin('field', Thrift.Type.STRING, 1);
      output.writeString(this.field);
      output.writeFieldEnd();
    }
    if (this.fType !== null && this.fType !== undefined) {
      output.writeFieldBegin('fType', Thrift.Type.I32, 2);
      output.writeI32(this.fType);
      output.writeFieldEnd();
    }
    if (this.condition !== null && this.condition !== undefined) {
      output.writeFieldBegin('condition', Thrift.Type.I32, 3);
      output.writeI32(this.condition);
      output.writeFieldEnd();
    }
    if (this.value !== null && this.value !== undefined) {
      output.writeFieldBegin('value', Thrift.Type.STRING, 4);
      output.writeString(this.value);
      output.writeFieldEnd();
    }
    if (this.additionValue !== null && this.additionValue !== undefined) {
      output.writeFieldBegin('additionValue', Thrift.Type.STRING, 5);
      output.writeString(this.additionValue);
      output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
    return;
  }

};
KazFilter = class {
  constructor(args) {
    this.position = null;
    this.countFilter = null;
    this.items = null;
    this.orders = null;
    if (args) {
      if (args.position !== undefined && args.position !== null) {
        this.position = args.position;
      }
      if (args.countFilter !== undefined && args.countFilter !== null) {
        this.countFilter = args.countFilter;
      }
      if (args.items !== undefined && args.items !== null) {
        this.items = Thrift.copyList(args.items, [FilterItem]);
      }
      if (args.orders !== undefined && args.orders !== null) {
        this.orders = Thrift.copyList(args.orders, [null]);
      }
    }
  }

  read (input) {
    input.readStructBegin();
    while (true) {
      const ret = input.readFieldBegin();
      const ftype = ret.ftype;
      const fid = ret.fid;
      if (ftype == Thrift.Type.STOP) {
        break;
      }
      switch (fid) {
        case 1:
        if (ftype == Thrift.Type.I32) {
          this.position = input.readI32().value;
        } else {
          input.skip(ftype);
        }
        break;
        case 2:
        if (ftype == Thrift.Type.I32) {
          this.countFilter = input.readI32().value;
        } else {
          input.skip(ftype);
        }
        break;
        case 3:
        if (ftype == Thrift.Type.LIST) {
          this.items = [];
          const _rtmp31 = input.readListBegin();
          const _size0 = _rtmp31.size || 0;
          for (let _i2 = 0; _i2 < _size0; ++_i2) {
            let elem3 = null;
            elem3 = new FilterItem();
            elem3.read(input);
            this.items.push(elem3);
          }
          input.readListEnd();
        } else {
          input.skip(ftype);
        }
        break;
        case 4:
        if (ftype == Thrift.Type.LIST) {
          this.orders = [];
          const _rtmp35 = input.readListBegin();
          const _size4 = _rtmp35.size || 0;
          for (let _i6 = 0; _i6 < _size4; ++_i6) {
            let elem7 = null;
            elem7 = input.readString().value;
            this.orders.push(elem7);
          }
          input.readListEnd();
        } else {
          input.skip(ftype);
        }
        break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
    input.readStructEnd();
    return;
  }

  write (output) {
    output.writeStructBegin('KazFilter');
    if (this.position !== null && this.position !== undefined) {
      output.writeFieldBegin('position', Thrift.Type.I32, 1);
      output.writeI32(this.position);
      output.writeFieldEnd();
    }
    if (this.countFilter !== null && this.countFilter !== undefined) {
      output.writeFieldBegin('countFilter', Thrift.Type.I32, 2);
      output.writeI32(this.countFilter);
      output.writeFieldEnd();
    }
    if (this.items !== null && this.items !== undefined) {
      output.writeFieldBegin('items', Thrift.Type.LIST, 3);
      output.writeListBegin(Thrift.Type.STRUCT, this.items.length);
      for (let iter8 in this.items) {
        if (this.items.hasOwnProperty(iter8)) {
          iter8 = this.items[iter8];
          iter8.write(output);
        }
      }
      output.writeListEnd();
      output.writeFieldEnd();
    }
    if (this.orders !== null && this.orders !== undefined) {
      output.writeFieldBegin('orders', Thrift.Type.LIST, 4);
      output.writeListBegin(Thrift.Type.STRING, this.orders.length);
      for (let iter9 in this.orders) {
        if (this.orders.hasOwnProperty(iter9)) {
          iter9 = this.orders[iter9];
          output.writeString(iter9);
        }
      }
      output.writeListEnd();
      output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
    return;
  }

};
