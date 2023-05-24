import { ApiProperty } from "@nestjs/swagger";
import { Man } from "./man.entity";
import { Parent } from "./parent.entity";

export class Child {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => Parent })
  parent: Parent;

  @ApiProperty({ type: () => Man })
  man: Man;
}
