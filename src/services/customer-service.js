export default class CustomerService {
  constructor(db) {
    this.db = db;
  }

  async find(params) {
    let docs = await this.db.customers.findDoc(params);
    return docs;
  }

  async get(id) {
    let doc = await this.db.customers.findDoc(id);
    return doc;
  }

  async create(data) {
    let doc = await this.db.saveDoc('customers', data);
    return doc;
  }

  async change(data) {
    let doc = await this.db.customers.saveDoc(data);
    return doc;
  }

  async patch(id, data) {
    let doc = await this.db.customers.updateDoc(id, data);
    return doc;
  }
}
