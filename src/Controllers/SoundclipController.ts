import { Db } from "mongodb";
import { SoundclipRepo } from "../Repos/SoundclipRepo";
import { Request, Response } from 'express'
import { checkIsDefined, isDefined } from "../Check";


export class SoundclipController {
  private _soundclipRepo: SoundclipRepo;
  constructor(client: Db) {
    this._soundclipRepo = new SoundclipRepo(client)
  }

  public search = async (req: Request<any>, res: Response<any>) => {
    const query = req.query
    console.debug('Search query', query)
    const result = await this._soundclipRepo.getAll(query)
    console.debug('Search result', result)
    return res.send(result)
  }

  public get = async (req: Request<any>, res: Response<any>) => {
    const id = req.params.soundclipId
    console.debug('get soundclip id', id)

    if (isDefined(id) === false) {
      const records = await this._soundclipRepo.getAll(req.query)
      console.debug('get all', records)
      return res.send(records)
    }

    const record = await this._soundclipRepo.get(id)
    console.debug('get', record)
    return res.send(record)
  }

  public post = async (req: Request<any>, res: Response<any>) => {
    const record = req.body
    checkIsDefined(record, "Record is not defined")

    const existingRecord = await this._soundclipRepo.get(record.soundclipId)

    await this._soundclipRepo.update(record)

    return res.sendStatus(isDefined(existingRecord) ? 200 : 201)
  }
  
  public delete = async (req: Request<any>, res: Response<any>) => {
    const id = req.params.soundclipId
    if(isDefined(id) === false){
      return res.sendStatus(301)
    }

    console.debug("delete soundclip", id)


    await this._soundclipRepo.delete(id)
    return res.sendStatus(200)
  }
}