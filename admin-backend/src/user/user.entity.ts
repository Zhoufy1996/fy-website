import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/shared/entity/base.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column('varchar', { length: 50 })
  username: string;

  @Exclude()
  @Column('varchar', { length: 200 })
  password: string;
}
