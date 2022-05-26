import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Marathon } from "src/marathon/entities/marathon.entity";
import { Problem } from "src/problem/entities/problem.entity";

@Table({ 
    tableName: 'MarathonProblems',
    modelName: 'MarathonProblems',
    timestamps: true,
    indexes: [
        {
            name: 'UK__MarathonProblems',
            unique: true,
            fields: ['marathonId', 'problemId'],
        },
    ], 
})
export class MarathonProblem extends Model<MarathonProblem> {
    @ApiProperty({ default: null })
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    id: number;

    @ApiProperty()
    @ForeignKey(() => Marathon)
    @Column({ type: DataType.NUMBER })
    @IsNotEmpty({ message: 'marathonId is required.' })
    marathonId: number;

    @ApiProperty()
    @ForeignKey(() => Problem)
    @Column({ type: DataType.NUMBER })
    @IsNotEmpty({ message: 'problemId is required.' })
    problemId: number;

    @ApiProperty()
    @Column({ type: DataType.NUMBER })
    orderBy: number;

    @ApiProperty()
    @CreatedAt
    public createdAt: Date;

    @ApiProperty()
    @UpdatedAt
    public updatedAt: Date;

    // RELAÇÕES
    @BelongsTo(() => Marathon)
    marathon: Marathon;
  
    @BelongsTo(() => Problem)
    problem: Problem;
}
