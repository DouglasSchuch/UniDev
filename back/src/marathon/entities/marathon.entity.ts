import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { MarathonProblem } from "src/marathon-problems/entities/marathon-problem.entity";
import { User } from "src/user/entities/user.entity";

@Table({ tableName: 'Marathons', modelName: 'Marathons', timestamps: true })
export class Marathon extends Model<Marathon> {
    @ApiProperty({ default: null })
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    id: number;

    @ApiProperty()
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    @IsNotEmpty({ message: 'Name is required.' })
    @MaxLength(255, { message: 'Name is too long' })
    name: string;

    @ApiProperty()
    @Column({ type: DataType.TEXT })
    description: string;

    @ApiProperty()
    @Column({ type: DataType.NUMBER })
    duration: string;

    @ApiProperty()
    @Column({ type: DataType.TEXT })
    password: string;

    @ApiProperty()
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    isActive: boolean;

    @ApiProperty()
    @Column({ type: DataType.INTEGER, allowNull: false })
    @ForeignKey(() => User)
    @IsNotEmpty({ message: 'createdUserId is required' })
    createdUserId: number;

    @ApiProperty()
    @CreatedAt
    public createdAt: Date;

    @ApiProperty()
    @UpdatedAt
    public updatedAt: Date;

    // COLUNAS NÃO USADAS NO BANCO DE DADOS
    // @Column({ type: DataType.VIRTUAL })
    // isLimitCycle = false;

    // RELAÇÕES
    @BelongsTo(() => User)
    createdUser: User;

    @HasMany(() => MarathonProblem)
    marathonProblems: MarathonProblem[];
}
