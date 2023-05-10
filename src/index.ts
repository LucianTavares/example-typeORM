import { AppDataSource } from "./data-source"
import { UserSchema } from "./entity/User"
import { UserPreferenceSchema } from "./entity/UserPreference"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")

    const userPreference = new UserPreferenceSchema()
    userPreference.id = "1"
    userPreference.name = "Lucian"
    userPreference.socialName = "Lucian Tavares"
    userPreference.documentNumber = "123456"
    await AppDataSource.manager.save(userPreference)
    console.log(`Saved a new User Preference with id: ${userPreference.id}`)

    const preferenceUser = await AppDataSource.manager.find(UserPreferenceSchema)
    console.log("Loaded preference", preferenceUser)

    const user = new UserSchema()
    user.id = "1"
    user.username = "Lucian"
    user.password = "123456"
    user.preference = userPreference
    await AppDataSource.manager.save(user)
    console.log(`Saved a new user with id:  ${user.id}`)

    console.log("Loading users from the database...")
    const users = await AppDataSource
        .getRepository(UserSchema)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.preference", "user_preference")
        .getMany()

    console.log("Loaded users: ", users)

    await AppDataSource
        .getRepository(UserSchema)
        .createQueryBuilder('users')
        .relation(UserPreferenceSchema, "user")
        .of(preferenceUser)
        .delete()
        .from(UserSchema)
        .where("id = :id", { id: 1 })
        .execute()

    await AppDataSource
        .getRepository(UserPreferenceSchema)
        .createQueryBuilder('preferenceUser')
        .relation(UserSchema, "user_preference")
        .of(users)
        .delete()
        .from(UserPreferenceSchema)
        .where("id = :id", { id: 1 })
        .execute()

}).catch(error => console.log(error))
