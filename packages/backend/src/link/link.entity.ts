import { Exclude } from 'class-transformer';
import { customAlphabet } from 'nanoid';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ALPHABET, CODE_LENGTH, MAX_CODE_LENGTH } from '../config/link.config';

const nanoid = customAlphabet(ALPHABET, CODE_LENGTH);

@Entity()
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ unique: true, length: MAX_CODE_LENGTH })
  code: string;

  @Column({ default: 0 })
  @Exclude()
  visitCount: number;

  @BeforeInsert()
  setCode() {
    if (!this.code) {
      this.code = nanoid();
    }
  }

  constructor(partial: Partial<Link>) {
    super();
    Object.assign(this, partial);
  }
}
