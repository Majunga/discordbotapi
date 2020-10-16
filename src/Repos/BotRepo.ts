import { Db } from "mongodb";
import { BaseRepo } from "./BaseRepo";

export class BotRepo extends BaseRepo {
  constructor(client:Db) {
    super(client.collection("bots"), "clientId")
  }
}
