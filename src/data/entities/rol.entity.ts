import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('roles')
export class Rol {
  @PrimaryColumn({
    type: 'int',
    nullable: false,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  descripcion?: string;

  @OneToMany(() => Usuario, (user) => user.rol)
  usuario: Usuario;
}
