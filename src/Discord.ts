import { Client } from 'discord.js'
import { Check } from './Check'

export class Discord {
  private _client: Client
  constructor(){
    this._client = new Client()

  }

  public Login = async (token:string) => {
    Check.checkIsDefined(token, 'token is defined')

    await this._client.login(token)
  }

  public Guilds = async(token:string) => {
    await this.Login(token)

    const guilds = this._client.guilds

    return guilds
  }
}