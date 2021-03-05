import { IsInt, IsString } from 'class-validator';

class ShortNoteEntity {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString({
    each: true,
  })
  keywords: string[];
}

export class AddDto extends ShortNoteEntity {}

export class UpdateDto extends ShortNoteEntity {
  @IsInt()
  id: number;
}

export class DeleteDto {
  @IsInt()
  id: number;
}

export class FindDto {}

export class FindOneDto {
  @IsInt()
  id: number;
}
