import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Usuario extends Model<Usuario> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
    })
    id: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;



    
}