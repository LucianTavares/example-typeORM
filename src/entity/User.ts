import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserPreferenceSchema } from "./UserPreference";

@Entity('user')
export class UserSchema {
    @PrimaryColumn()
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    // @OneToOne(() => UserPreferenceSchema)
    @OneToOne(
        () => UserPreferenceSchema,
        (preference) => preference.user,
        {
            eager: true,
            cascade: true
        },
    )
    @JoinColumn()
    preference: UserPreferenceSchema;
}
