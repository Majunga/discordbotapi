import { Db } from "mongodb";
import { BaseRepo } from "./BaseRepo";

export class SoundclipRepo extends BaseRepo {
  constructor(client:Db) {
    super(client.collection("soundclips"), "soundclipId")
  }
}
