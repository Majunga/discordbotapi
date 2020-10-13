import { Client, TextChannel, VoiceChannel } from 'discord.js'
import { Check } from './Check'
import * as ytdl from 'ytdl-core'

export class Discord {

  
  private _client: Client
  private _loginPromise: Promise<string>
  constructor  (token:string){
    this._client = new Client()
    this._loginPromise = this._client.login(token)

  }

  public Guilds = async() => {
    await this._loginPromise

    const cachedGuilds = this._client.guilds.cache.map(g => g.id)

    const guilds = []
    for(const guildId of cachedGuilds){
      const guild = await this._client.guilds.fetch(guildId, false)
      guilds.push(guild)
    }

    return guilds
  }

  public Message = async (guildId:string, channelId:string, message:string) => {
    await this._loginPromise

    const guild = this._client.guilds.cache.find(g => g.id === guildId)
    const channel = guild?.channels.cache.find(ch => ch.id === channelId) as TextChannel
    await channel?.send(message)
  }
  
  private getCurrentVoiceChannel = async (guildId:string, userId:string) => {
    const guild = await this._client.guilds.cache.find(g => g.id === guildId)
    const member = await guild?.members.fetch(userId)

    const membersCurrentChannel = member?.voice.channelID

    if(Check.isNullOrWhitespace(membersCurrentChannel)){
      return;
    }

    return guild?.channels.cache.find(ch => ch.id === membersCurrentChannel) as VoiceChannel
  }

  public PlayMusic = async (guildId: any, userId: any, url:string) => {
    await this._loginPromise

    const channel = await this.getCurrentVoiceChannel(guildId, userId)

    if(channel === undefined){
      console.log("Users channel not found")
      return;
    }

    const connection = await channel.join()

    const stream = ytdl.default(url, { filter: 'audioonly' });

    const dispatcher = connection.play(stream, {
      seek:0, volume: 0.05
    });

    dispatcher.on('finish', () => channel.leave());
  }

  public JoinChannel = async (guildId:string, userId:string) => {
    await this._loginPromise

    const channel = await this.getCurrentVoiceChannel(guildId, userId)
    await channel?.join()
  }
    
  public LeaveChannel = async (guildId:string, userId:string) => {
    await this._loginPromise

    const guild = await this._client.guilds.cache.find(g => g.id === guildId)
    await guild?.me?.voice.channel?.leave()
  }

  public dispose() {
    this._client.destroy()
  }
}