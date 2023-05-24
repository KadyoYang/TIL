import { ApiProperty } from "@nestjs/swagger";
import { Child } from "./child.entity";
import { Man } from "./man.entity";

export class Parent {
  @ApiProperty()
  name: string;
  @ApiProperty()
  amIParent: boolean;

  @ApiProperty({ type: () => Child, isArray: true })
  childs: Child[];

  @ApiProperty({ type: () => Man })
  man: Man;
}
