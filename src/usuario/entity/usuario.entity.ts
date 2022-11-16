import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Usuario extends Model<Usuario> {
    @Column({
        type: DataType.STRING(36),
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @Column({
        type: DataType.STRING(32),
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING(64),
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: true,
    })
    password: string;



    
}