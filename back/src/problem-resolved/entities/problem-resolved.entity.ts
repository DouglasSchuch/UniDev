import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Marathon } from "src/marathon/entities/marathon.entity";
import { Problem } from "src/problem/entities/problem.entity";
import { User } from "src/user/entities/user.entity";

@Table({ tableName: 'ProblemResolved', modelName: 'ProblemResolved', timestamps: true })
export class ProblemResolved extends Model<ProblemResolved> {
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
    @ForeignKey(() => User)
    @Column({ type: DataType.NUMBER })
    @IsNotEmpty({ message: 'userId is required.' })
    userId: number;

    @ApiProperty()
    @Column({ type: DataType.INTEGER })
    time: number;

    @ApiProperty()
    @ForeignKey(() => Marathon)
    @Column({ type: DataType.NUMBER })
    @IsNotEmpty({ message: 'resolvedMarathonId is required.' })
    resolvedMarathonId: number;

    @ApiProperty()
    @CreatedAt
    public createdAt: Date;

    @ApiProperty()
    @UpdatedAt
    public updatedAt: Date;

    // RELAÇÕES
    @BelongsTo(() => Problem)
    problem: Problem;
    
    @BelongsTo(() => User)
    user: User;
    
    @BelongsTo(() => Marathon)
    marathon: Marathon;
}
