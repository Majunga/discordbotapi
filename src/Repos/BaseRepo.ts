import { Collection } from 'mongodb';
import { isDefined } from '../Check';

export class BaseRepo {
  Db: Collection<any>;
  private _idName: string;
  constructor(db: Collection<any>, idName: string) {
    this.Db = db
    this._idName = idName
  }

  public getAll = async () => {
    try {
      const records = await this.Db.find().toArray()
      return records
    } catch (ex) {
      console.error(ex)
    }
  }

  public get = async (id: any) => {

    try {
      return await this.Db.findOne({ [this._idName]: id })
    } catch (ex) {
      console.error(ex)
    }
  }

  public update = async (newRecord: any) => {
    if (isDefined(newRecord) === false) return;

    const query = { [this._idName]: newRecord[this._idName] }
    try {
      await this.Db.findOneAndUpdate(
        query,
        { $set: newRecord }, {
        upsert: true
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  public delete = async (id: any) => {
    const query = { [this._idName]: id }

    try {
      await this.Db.findOneAndDelete(query)
    }
    catch(ex) {
      console.error(ex)
    }
  }
}
