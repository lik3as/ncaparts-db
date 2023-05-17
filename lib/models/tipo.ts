import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  Unique
} from 'sequelize-typescript'
import {Produto} from './produto';

@Table
export class Tipo extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Unique(true)
  @Column
  declare nome: string;

  @HasMany(()=> Produto)
  produtos: Produto[];

}
