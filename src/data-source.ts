import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserSchema } from "./entity/User"
import { UserPreferenceSchema } from "./entity/UserPreference"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "database",
    port: 3306,
    username: "root",
    password: "root",
    database: "typeormexample",
    synchronize: true,
    logging: false,
    entities: [UserSchema, UserPreferenceSchema],
    migrations: [],
    subscribers: [],
})
