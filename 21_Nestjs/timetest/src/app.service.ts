import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  async getException(num: number) {
    return await this.resolveNumber(num);
  }

  async resolveNumber(num: number) {
    if (num === 10) {
      throw new BadRequestException("10을 던지다니");
    }
    return num;
  }
}
