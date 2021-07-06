import { customAlphabet } from 'nanoid';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ALPHABET, CODE_LENGTH } from '../config/links.config';

const nanoid = customAlphabet(ALPHABET, CODE_LENGTH);

@Entity()
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ unique: true })
  code: string;

  @Column({ default: 0 })
  visitCount: number;

  @BeforeInsert()
  setCode() {
    if (!this.code) {
      this.code = nanoid();
    }
  }
}
