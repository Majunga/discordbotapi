import { Db } from "mongodb";
import { GuildRepo } from "../Repos/GuildRepo";
import { Request, Response } from 'express'
import { checkIsDefined, isDefined } from "../Check";


export class GuildController {
  private _guildBot: GuildRepo;
  constructor(client: Db) {
    this._guildBot = new GuildRepo(client)
  }

  public search = async (req: Request<any>, res: Response<any>) => {
    const query = req.body
    console.debug('Search query', query)
    const result = await this._guildBot.getAll(query)
    console.debug('Search result', result)
    return res.send(result)
  }

  public get = async (req: Request<any>, res: Response<any>) => {
    const guildId = req.query.guildId
    console.debug('get guildId', guildId)

    if (isDefined(guildId) === false) {
      const records = await this._guildBot.getAll(req.query)
      console.debug('get all', records)
      return res.send(records)
    }

    const record = await this._guildBot.get(guildId)
    console.debug('get', record)
    return res.send(record)
  }

  public post = async (req: Request<any>, res: Response<any>) => {
    const record = req.body
    checkIsDefined(record, "Record is not defined")

    const existingRecord = await this._guildBot.get(record.guildId)

    await this._guildBot.update(record)

    return res.sendStatus(isDefined(existingRecord) ? 200 : 201)
  }
  
  public delete = async (req: Request<any>, res: Response<any>) => {
    if(isDefined(req.query.guildId) === false){
      return res.sendStatus(301)
    }

    console.debug("delete guild", req.query.guildId)


    await this._guildBot.delete(req.query.guildId)
    return res.sendStatus(200)
  }
}