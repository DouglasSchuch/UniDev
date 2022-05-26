import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { ProblemTestParameter } from "src/problem-test-parameter/entities/problem-test-parameter.entity";
import { Problem } from "src/problem/entities/problem.entity";

@Table({ tableName: 'ProblemTests', modelName: 'ProblemTests', timestamps: true })
export class ProblemTest extends Model<ProblemTest> {
    @ApiProperty({ default: null })
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    id: number;

    @ApiProperty()
    @ForeignKey(() => Problem)
    @Column({ type: DataType.NUMBER })
    @IsNotEmpty({ message: 'problemId is required.' })
    problemId: number;

    @ApiProperty()
    @Column({ type: DataType.TEXT })
    result: string;

    @ApiProperty()
    @CreatedAt
    public createdAt: Date;

    @ApiProperty()
    @UpdatedAt
    public updatedAt: Date;

    // RELAÇÕES
    @BelongsTo(() => Problem)
    problem: Problem;

    @HasMany(() => ProblemTestParameter)
    problemTestParameters: ProblemTestParameter[];
}
