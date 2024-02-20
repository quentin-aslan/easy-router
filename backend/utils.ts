import {Low} from "lowdb";
import {JSONFile} from "lowdb/node";
import {Database} from "./types";

let CURRENT_DB: Low<Database> | undefined = undefined
export const getDb = async () => {
    if (CURRENT_DB) return CURRENT_DB
    const file = './db.json'

    const adapter = new JSONFile<Database>(file)
    const defaultData = {  }
    const db = new Low<Database>(adapter, defaultData)

    await db.read()
    CURRENT_DB = db
    return db
}