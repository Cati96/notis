export class Document {
  id: number;
  type: string;
  format: string;
  template: string;
  price: number;

  constructor(obj) {
    this.id = obj.id;
    this.type = obj.type;
    this.format = obj.format;
    this.template = obj.template;
    this.price = obj.price;
  }
}
