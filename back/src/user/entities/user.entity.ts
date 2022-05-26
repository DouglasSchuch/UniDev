import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { AutoIncrement, Column, CreatedAt, DataType, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Marathon } from "src/marathon/entities/marathon.entity";
import { Problem } from "src/problem/entities/problem.entity";

@Table({ tableName: 'Users', modelName: 'Users', timestamps: true })
export class User extends Model<User> {
    @ApiProperty({ default: null })
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    id: number;

    @ApiProperty()
    @Column({ type: DataType.STRING, allowNull: false })
    @IsNotEmpty({ message: 'Name is required.' })
    @MaxLength(255, { message: 'Name is too long' })
    name: string;

    @ApiProperty()
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    @IsNotEmpty({ message: 'Username is required.' })
    @MaxLength(255, { message: 'Username is too long' })
    username: string;

    @ApiProperty()
    @Column({ type: DataType.STRING })
    @MaxLength(100, { message: 'E-mail is too long' })
    email: string;

    @ApiProperty()
    @Column({ type: DataType.STRING })
    @MaxLength(100, { message: 'Course is too long' })
    course: string;

    @ApiProperty()
    @Column({ type: DataType.STRING })
    @MaxLength(255, { message: 'University is too long' })
    university: string;

    @ApiProperty()
    @Column({ type: DataType.STRING })
    @MaxLength(255, { message: 'City is too long' })
    city: string;

    @ApiProperty()
    @Column({ type: DataType.TEXT, allowNull: false })
    @IsNotEmpty({ message: 'Password is required.' })
    password: string;

    @ApiProperty()
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    isActive: boolean;

    @ApiProperty()
    @CreatedAt
    public createdAt: Date;

    @ApiProperty()
    @UpdatedAt
    public updatedAt: Date;

    // RELAÇÕES
    @HasMany(() => Marathon)
    marathons: Marathon[];
    
    @HasMany(() => Problem)
    problems: Problem[];
}
