import { Discord } from "./Discord"
import { isDefined } from "./Check"


class DiscordItem {
  private _token: string;
  private _discordInstance: Discord;
  constructor(token:string, discordInstance:Discord) {
    this._token = token
    this._discordInstance = discordInstance
  }
  get Token():string { return this._token; }
  get DiscordInstance():Discord { return this._discordInstance; }
}

let discords:DiscordItem[] = []

const getInstance = (token:string):Discord => {
  const discordFactory = discords.find(d => d.Token === token)

  if(isDefined(discordFactory)){
    return (discordFactory as DiscordItem).DiscordInstance
  }

  const discord = new Discord(token);
  discords.push(new DiscordItem(token, discord))
  return discord
}

const disposeClient = (token:string) => {
  const discord = discords.find(d => d.Token === token)
  discords = discords.filter(d => d.Token !== token)
  discord?.DiscordInstance.dispose()
}

export {
  getInstance,
  disposeClient
}