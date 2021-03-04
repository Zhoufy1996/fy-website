import { IsInt, IsString } from 'class-validator';

export class GetOneDto {
  @IsInt()
  id: number;
}

export class AddDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString({
    each: true,
  })
  keywords: string[];
}

export class UpdateDto extends AddDto {
  @IsInt()
  id: number;
}

export class DeleteDto {
  @IsInt()
  id: number;
}
