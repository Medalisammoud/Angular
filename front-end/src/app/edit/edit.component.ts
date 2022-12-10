import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { NgForm } from "@angular/forms";
import { PostsService } from "../Product/posts.service";
import { Post } from "../Product/post.model";
import { mimeType } from "../ajout-produit/mime-type.validator";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  enteredTitle = "";
  enteredContent = "";
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  file: File=null; // Variable to store file
  private mode = "create";
  private postId: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      desc: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] }),
      qty: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          
          this.post = {
            id: postData._id,
            name: postData.name,
            price: postData.price,
            qty: postData.qty,
            desc: postData.desc,
            image: postData.image,
            catg: postData.catg,
            creator: postData.creator
          };
          this.form.setValue({
            name: this.post.name,
            price: this.post.price,
            qty: this.post.qty,
            desc: this.post.desc,
            image: this.post.image
          });
        });
      }
    });
  }


  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
  }
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
      this.postsService.updatePost(
        this.postId,
        this.form.value.name,
        this.form.value.price,
        this.form.value.qty,
        this.form.value.desc,
        this.form.value.catg,
        this.file
      );

  }

}
