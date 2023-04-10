import { Enum, EnumType } from "ts-jenum";

@Enum("code")
export class HttpStatus extends EnumType<HttpStatus>() {
  static readonly OK = new HttpStatus(200, "ok");
  static readonly BadRequest = new HttpStatus(400, "badbad");
  static readonly InternalError = new HttpStatus(500, "interinterstellar");

  private constructor(
    private readonly _code: number,
    private readonly _message: string
  ) {
    super();
  }
  get code(): number {
    return this._code;
  }
  get message(): string {
    return this._message;
  }

  static toHttpStatus(code: number) {
    return HttpStatus.valueOf(code);
  }
}

console.log(HttpStatus.toHttpStatus(500).message);
