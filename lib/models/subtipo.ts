import {Produto} from './index'
import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  Unique
} from 'sequelize-typescript'

@Table
export class Subtipo extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;
  
  @Unique(true)
  @Column
  declare nome: string;

  @HasMany(() => Produto)
  produtos: Produto[]


}
