import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; products: any; maxPosts: number }>(
        "http://localhost:8000/api/product" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.products.map(post => {
              return {
                name: post.name,
                desc: post.desc,
                id: post._id,
                image: post.image,
                price: post.price,
                qty: post.qty,
                catg: post.categorie,
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      price: string;
      qty: string;
      desc: string;
      catg: string;
      image: string;
      creator: string;
    }>("http://localhost:8000/api/product/" + id);
  }

  addPost(name: string, price: string, qty: string, desc: string,catg: string, image: File) {
    const postData = new FormData();
    postData.append("name", name);
    postData.append("price", price);
    postData.append("qty", qty);
    postData.append("desc", desc);
    postData.append("categorie", catg);
    postData.append("productImage", image, name);
    this.http
      .post<{ message: string; post: Post }>(
        "http://localhost:8000/api/product/add",
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/lists"]);
      });
      this.router.navigate(["/lists"]);
  }

  updatePost(id: string, name: string, price: string, qty: string, desc: string,catg: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("name", name);
      postData.append("price", price);
      postData.append("qty", qty);
      postData.append("desc", desc);
      postData.append("categorie", catg);
      postData.append("productImage", image, name);
    } else {
      postData = {
        id: id,
        name: name,
        desc: desc,
        price: price,
        qty: qty,
        catg: catg,
        image: image,
        creator: ""
      };
    }
    this.http
      .put("http://localhost:8000/api/product/update/" + id, postData)
      .subscribe(response => {
        this.router.navigate(["/lists"]);
      });
      this.router.navigate(["/lists"]);
  }

  deletePost(postId: string) {
    return this.http.delete("http://localhost:8000/api/product/delete/" + postId);
  }
}
