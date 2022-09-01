import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import {
  Connection,
  createQueryBuilder,
  getRepository,
  Repository,
} from "typeorm";
import { Parent } from "./parent.entity";
import { captureRejections } from "events";
import { Child } from "./child.entity";

@Injectable()
export class NestedService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection
  ) {}

  async getInfo() {
    return this.connection.manager.find(Child, {
      relations: ["parent"],
      where: { parent: { name: "모모모" } },
    });
  }
}
