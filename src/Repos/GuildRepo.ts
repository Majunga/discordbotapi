import { Db } from "mongodb";
import { BaseRepo } from "./BaseRepo";

export class GuildRepo extends BaseRepo {
  constructor(client:Db) {
    super(client.collection("guilds"), "guildId")
  }
}
