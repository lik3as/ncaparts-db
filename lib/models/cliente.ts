import { cli_scopes } from '../scopes/scope_cli';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Scopes,
  Unique,
} from 'sequelize-typescript';

@Scopes(cli_scopes)

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
  
  @Unique(true)
  @Column
  declare email: string;

  @Column
  declare senha: string;

  @Column
  declare revendedor: boolean;
};
