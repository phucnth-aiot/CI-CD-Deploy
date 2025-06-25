import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './notes.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private noteRepo: Repository<Note>) {}

  findAll(): Promise<Note[]> {
    return this.noteRepo.find();
  }

  findOne(id: number): Promise<Note | null> {
    return this.noteRepo.findOne({ where: { id } });
  }

  create(data: CreateNoteDto): Promise<Note> {
    return this.noteRepo.save(this.noteRepo.create(data));
  }

  async update(id: number, data: UpdateNoteDto) {
    await this.noteRepo.update(id, data);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.noteRepo.delete(id);
  }
}
