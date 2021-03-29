import { Component, OnInit } from '@angular/core';
import CommentModel from '../../models/comment.model';
import { AppService } from '../../services/app.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  comment: CommentModel[];
  currentComment?: CommentModel;
  currentIndex = -1;
  title = '';

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getAllComment();
  }

  refreshList(): void {
    this.currentComment = undefined;
    this.currentIndex = -1;
    this.getAllComment();
  }

  getAllComment(): void {
    this.appService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.comment = data;
    });
  }

  setActiveComment(comment: CommentModel, index: number): void {
    this.currentComment = comment;
    this.currentIndex = index;
  }

  removeAllComment(): void {
    this.appService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
}
