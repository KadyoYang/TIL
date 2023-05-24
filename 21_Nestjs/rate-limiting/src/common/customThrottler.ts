import { Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { Request } from "express";

@Injectable()
export class ThrottlerUserIdGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): string {
    // const request = req as Request;

    // console.log(request.headers);
    // console.log(request.body);
    // // console.log(request.param);
    // console.log(request.query);
    // // console.dir(req, { depth: null });
    // console.log("getTracker");

    // const ip = req.ips.length ? req.ips[0] : req.ip;
    // console.log(req.ips[0]);
    // console.log(req.ip);
    // console.log(ip);
    // return request.body.userId ? String(request.body.userId) || req.ip : req.ip;
    const request = req as Request;
    const xApiKey =
      request.headers["x-api-key"] || request.headers["X-API-KEY"];
    const ip = req.ips.length ? req.ips[0] : req.ip;
    console.log(xApiKey || ip);
    return xApiKey || ip;
  }
}
