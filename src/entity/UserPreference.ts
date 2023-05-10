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

  @Column({ nullable: true })
  avatarUrl: string;

  @Column()
  displayName: string;

  @Column({ type: 'datetime', nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  cityBirth: string;

  @Column({ nullable: true })
  stateBirth: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  mobile: string;

  @Column()
  isEmailOptin: boolean;

  @Column()
  isMobileSmsOptin: boolean;

  @OneToOne(() => UserSchema, (user) => user.preference)
  user: UserSchema;
}