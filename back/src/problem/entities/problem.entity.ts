import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

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
    // @HasMany(() => LoanUnitTool)
    // loanUnitTools: LoanUnitTool[];

    // @BelongsTo(() => Tool)
    // tool: Tool;

    // @HasMany(() => TagsUnitTool)
    // //@HasMany(() => TagsUnitTool, { as: 'tags' })
    // tagsUnitTool: TagsUnitTool[];
}
