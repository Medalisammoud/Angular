import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from "rxjs";

import { Post } from "../Product/post.model";
import { PostsService } from "../Product/posts.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
  imageObject: Array<object> = [{
    image: '../../assets/img/music.jpg',
    thumbImage: '../../assets/img/music.jpg',
    alt: 'Evenement Musical',
    title: 'Evenement Musical',
}, {
    image: '../../assets/img/fete.jpg', // Support base64 image
    thumbImage: '../../assets/img/fete.jpg', // Support base64 image
    title: "Evenement reveillon 2023", //Optional: You can use this key if want to show image with title
    alt: 'Evenement reveillon 2023', //Optional: You can use this key if want to show image with alt
    order: 1 ,

}, {
  image: '../../assets/img/foot.jpg', // Support base64 image
  thumbImage: '../../assets/img/foot.jpg', // Support base64 image
  title: 'Evenement Coupe du monde de football', //Optional: You can use this key if want to show image with title
  alt: 'Evenement Coupe du monde de football', //Optional: You can use this key if want to show image with alt
  order: 2,
}
];

}
