import { Db } from "mongodb";
import { BotRepo } from "../Repos/BotRepo";
import { Request, Response } from 'express'
import { checkIsDefined, isDefined } from "../Check";


export class BotController {
  private _botRepo: BotRepo;
  constructor(client: Db) {
    this._botRepo = new BotRepo(client)
  }

  public get = async (req: Request<any>, res: Response<any>) => {
    const clientId = req.params.clientId
    console.debug('get bot', clientId)

    if (isDefined(clientId) === false) {
      const clients = await this._botRepo.getAll()
      console.debug('get all bots', clients)

      return res.send(clients)
    }

    const client = await this._botRepo.get(clientId)
    console.debug('get all bot', client)
    return res.send(client)
  }

  public post = async (req: Request<any>, res: Response<any>) => {
    const record = req.body
    checkIsDefined(record, "Record is not defined")

    const existingBot = await this._botRepo.get(record.clientId)

    await this._botRepo.update(record)

    return res.sendStatus(isDefined(existingBot) ? 200 : 201)
  }
  
  public delete = async (req: Request<any>, res: Response<any>) => {
    const clientId = req.params.clientId
    if(isDefined(clientId) === false){
      return res.sendStatus(301)
    }
    
    console.debug("delete bot", clientId)
    await this._botRepo.delete(clientId)
    return res.sendStatus(200)
  }
}