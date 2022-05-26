import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { ProblemTest } from "src/problem-test/entities/problem-test.entity";

@Table({ tableName: 'ProblemTestParameters', modelName: 'ProblemTestParameters', timestamps: true })
export class ProblemTestParameter extends Model<ProblemTestParameter> {
    @ApiProperty({ default: null })
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    id: number;

    @ApiProperty()
    @ForeignKey(() => ProblemTest)
    @Column({ type: DataType.NUMBER })
    @IsNotEmpty({ message: 'problemTestId is required.' })
    problemTestId: number;

    @ApiProperty()
    @Column({ type: DataType.TEXT })
    value: string;

    @ApiProperty()
    @CreatedAt
    public createdAt: Date;

    @ApiProperty()
    @UpdatedAt
    public updatedAt: Date;

    // RELAÇÕES
    @BelongsTo(() => ProblemTest)
    problemTest: ProblemTest;
}
