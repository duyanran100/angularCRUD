import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import CommentModel from '../../models/comment.model';
import { AppService } from '../../services/app.service';
import firebase from 'firebase';
import App = firebase.app.App;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit, OnChanges{

  @Input() comment?: CommentModel;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentComment: CommentModel = {
    title: '',
    content: '',
  };
  message = '';

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentComment = { ...this.comment };
  }

  updateComment(): void {
    const data = {
      title: this.currentComment.title,
      description: this.currentComment.content
    };

    if (this.currentComment.key) {
      this.appService.update(this.currentComment.key, data)
        .then(() => this.message = 'Update Work');
    }
  }

  deleteComment(): void {
    if (this.currentComment.key) {
      this.appService.delete(this.currentComment.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'Delete Work';
        });
    }
  }
}
