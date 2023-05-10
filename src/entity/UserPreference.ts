import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { UserSchema } from "./User";

@Entity('user_preference')
export class UserPreferenceSchema {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  socialName: string;

  @Column({ nullable: true })
  documentNumber: string;

  @OneToOne(() => UserSchema, (user) => user.preference)
  user: UserSchema;
}