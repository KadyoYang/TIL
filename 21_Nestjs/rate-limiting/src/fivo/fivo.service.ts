import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  createQueryBuilder,
  getRepository,
  Repository,
} from 'typeorm';
import { Fivo } from './fivo.entity';
import { captureRejections } from 'events';

const idxs: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
@Injectable()
export class FivoService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection
  ) { }

  async getFivos() {
    return this.connection.manager.find(Fivo);
  }

  async createFivos() {
    for await (let i of idxs) {
      this.connection.manager.save(this.connection.manager.create(Fivo, { id: i, amount: 0 }));
    }
  }

  async deleteFivos() {
    this.connection.manager.createQueryBuilder().delete().from(Fivo).execute();
  }

  async calculate() {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for await (let i of idxs) {
        const fivo = await queryRunner.manager.findOne(Fivo, i);
        if (i === 1) {
          fivo.amount = 1;
        } else if (i === 2) {
          fivo.amount = 1;
        } else {
          const beforeFivo = await queryRunner.manager.findOne(Fivo, i - 1);
          const beforeBeforeFivo = await queryRunner.manager.findOne(Fivo, i - 2);
          fivo.amount = beforeFivo.amount + beforeBeforeFivo.amount;
        }

        await queryRunner.manager.save(fivo);
        if (i === 10) {
          throw new Error("음");
        }
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

}
