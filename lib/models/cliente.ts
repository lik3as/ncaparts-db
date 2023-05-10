import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';


@Table
export class Cliente extends Model{
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @Column
  declare nome: string;
  
  @Column
  declare contato: string;
  
  @Column
  declare email: string;

  @Column
  declare senha: number;

  @Column
  declare revendedor: boolean;
};
