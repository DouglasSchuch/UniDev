import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Marathon } from "src/marathon/entities/marathon.entity";
import { User } from "src/user/entities/user.entity";

@Table({ tableName: 'MarathonResolved', modelName: 'MarathonResolved', timestamps: true })
export class MarathonResolved extends Model<MarathonResolved> {
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
    @ForeignKey(() => User)
    @Column({ type: DataType.NUMBER })
    @IsNotEmpty({ message: 'userId is required.' })
    userId: number;

    @ApiProperty()
    @Column({ type: DataType.NUMBER, defaultValue: 0 })
    time: number;

    @ApiProperty()
    @CreatedAt
    public createdAt: Date;

    @ApiProperty()
    @UpdatedAt
    public updatedAt: Date;

    // RELAÇÕES
    @BelongsTo(() => Marathon)
    marathon: Marathon;
  
    @BelongsTo(() => User)
    user: User;
}
