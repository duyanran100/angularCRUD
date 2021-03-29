import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import CommentModel from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private dbPath = '/lists';

  firelist: AngularFireList<CommentModel>;

  constructor(private db: AngularFireDatabase) {
    this.firelist = db.list(this.dbPath);
  }

  getAll(): AngularFireList<CommentModel> {
    return this.firelist;
  }

  create(list: CommentModel): any {
    return this.firelist.push(list);
  }

  update(key: string, value: any): Promise<void> {
    return this.firelist.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.firelist.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.firelist.remove();
  }
}
