import { IsInt, IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  name: string;

  @IsInt({
    each: true,
  })
  content: number[];
}

export class GetOneDto {
  @IsString()
  name: string;
}
