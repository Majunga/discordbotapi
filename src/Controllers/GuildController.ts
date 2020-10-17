import { Db } from "mongodb";
import { GuildRepo } from "../Repos/GuildRepo";
import { Request, Response } from 'express'
import { checkIsDefined, isDefined } from "../Check";


export class GuildController {
  private _guildRepo: GuildRepo;
  constructor(client: Db) {
    this._guildRepo = new GuildRepo(client)
  }

  public search = async (req: Request<any>, res: Response<any>) => {
    const query = req.query
    console.debug('Search query', query)
    const result = await this._guildRepo.getAll(query)
    console.debug('Search result', result)
    return res.send(result)
  }

  public get = async (req: Request<any>, res: Response<any>) => {
    const guildId = req.query.guildId
    console.debug('get guildId', guildId)

    if (isDefined(guildId) === false) {
      const records = await this._guildRepo.getAll(req.query)
      console.debug('get all', records)
      return res.send(records)
    }

    const record = await this._guildRepo.get(guildId)
    console.debug('get', record)
    return res.send(record)
  }

  public post = async (req: Request<any>, res: Response<any>) => {
    const record = req.body
    checkIsDefined(record, "Record is not defined")

    const existingRecord = await this._guildRepo.get(record.guildId)

    await this._guildRepo.update(record)

    return res.sendStatus(isDefined(existingRecord) ? 200 : 201)
  }
  
  public delete = async (req: Request<any>, res: Response<any>) => {
    if(isDefined(req.query.guildId) === false){
      return res.sendStatus(301)
    }

    console.debug("delete guild", req.query.guildId)


    await this._guildRepo.delete(req.query.guildId)
    return res.sendStatus(200)
  }
}