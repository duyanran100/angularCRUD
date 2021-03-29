import { Component, OnInit } from '@angular/core';
import CommentModel from '../../models/comment.model';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  comment: CommentModel = new CommentModel();
  submitted = false;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  submitList(): void{
    this.appService.create(this.comment).then( () => {
      console.log('add work');
      this.submitted = true;
    });
  }

  newList(): void{
    this.submitted = false;
    this.comment = new CommentModel();
  }

  redirect(): void{
    this.router.navigate(['list']);
  }

}
