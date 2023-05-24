import { prod_scopes } from '../scopes/scopes'

import {
  Marca,
  Modelo,
  Tipo,
  Subtipo,
  Fabricante,
  ProdFab,
  ProdKit,
  Kit,
  Mercadoria,
  Versao
} from './index'

import {
  HasMany,
  BelongsToMany,
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  HasOne,
  BelongsTo,
  Scopes,
  DataType,
  Unique,
  AllowNull
} from 'sequelize-typescript'

/*
    * Os primeiros três conjuntos de associação servem para
    * classificar o produto como no seguinte exemplo:
    * Eletrônico -> Tipo
    * Subtitipo -> Celular
    * Samsung -> Marca
    * S10 -> Modelo
*/

@Scopes(prod_scopes)

/*
*   Categories are:
*   tipo, subtipo, marca and modelo
*/

@Table
export class Produto extends Model{
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @Column(DataType.ARRAY(DataType.STRING(1024)))
  declare imagens: string[]

  /*
  *   Product Auto-Association
  */
  @BelongsTo(() => Produto)
  produto: Produto

  @ForeignKey(() => Produto)
  @Column
  declare id_prodSku: number;

  /*
  *   OneToMany Product Spec Associations
  */

  @ForeignKey(() => Tipo)
  @Column
  declare id_tipo: number;

  @BelongsTo(() => Tipo)
  tipo: Tipo;

  @ForeignKey(() => Subtipo)
  @Column
  declare id_subtipo: number;

  @BelongsTo(() => Subtipo)
  subtipo: Subtipo;
  
  @ForeignKey(() => Marca)
  @Column
  declare id_marca: number;

  @BelongsTo(() => Marca)
  marca: Marca;

  @ForeignKey(() => Modelo)
  @Column
  declare id_modelo: number;

  @BelongsTo(() => Modelo)
  modelo: Modelo;

  @ForeignKey(() => Versao)
  @Column
  declare id_versao: number;

  @BelongsTo(() => Versao)
  versao: Versao;

  /*
  *   OneToMany Other Associations
  */

  @HasMany(() => Mercadoria)
  mercadorias: Mercadoria[];

  @Unique(true)
  @AllowNull(false)
  @Column
  declare sku: string;

  @Column
  declare final: boolean;

  @Column
  declare desc: string;
  
  /*
  *   Many To Many Associations
  */

  @BelongsToMany(() => Fabricante, () => ProdFab, 'id_prod', 'id_fab')
  fabricantes: Fabricante[];

  @BelongsToMany(() => Kit, () => ProdKit, 'id_prod', 'id_kit')
  kits: Kit[];

}
