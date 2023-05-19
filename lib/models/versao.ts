import {
  Model,
  Column,
  HasMany,
  Table,
  PrimaryKey,
  AutoIncrement,
  Unique,
} from 'sequelize-typescript'
import { Produto } from './produto'


@Table({tableName: 'Versoes', name: {plural: 'Versao', singular: 'Versoes'}})
export class Versao extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number
  
  @Unique(true)
  @Column
  declare nome: string

  @HasMany(() => Produto)
  produtos: Produto[]
}
