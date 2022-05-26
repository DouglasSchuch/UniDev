import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { ProblemTest } from "src/problem-test/entities/problem-test.entity";
import { User } from "src/user/entities/user.entity";

@Table({ tableName: 'Problems', modelName: 'Problems', timestamps: true })
export class Problem extends Model<Problem> {
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
    @Column({ type: DataType.TEXT })
    codeDefault: string;

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

    // RELAÇÕES
    @HasMany(() => ProblemTest)
    problemTests: ProblemTest[];

    @BelongsTo(() => User)
    createdUser: User;
}
