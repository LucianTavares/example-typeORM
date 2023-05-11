import { AppDataSource } from "./data-source"
import { UserSchema } from "./entity/User"
import { UserPreferenceSchema } from "./entity/UserPreference"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")

    const user = new UserSchema()
    user.id = "1"
    user.username = "Lucian"
    user.password = "123456"
    await AppDataSource.manager.save(user)
    console.log(`Saved a new user with id:  ${user.id}`)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(UserSchema)

    console.log("Loaded users: ", users)

    const userPreference = new UserPreferenceSchema()
    userPreference.id = "1"
    userPreference.name = "Lucian"
    userPreference.socialName = "Lucian Tavares"
    userPreference.documentNumber = "123456"
    userPreference.user = user
    await AppDataSource.manager.save(userPreference)
    console.log(`Saved a new User Preference with id: ${userPreference.id}`)

    const preferenceUser = await AppDataSource.manager.find(UserPreferenceSchema)
    console.log("Loaded User preference:", preferenceUser)

    await AppDataSource.getRepository(UserSchema).delete(user)

}).catch(error => console.log(error))
