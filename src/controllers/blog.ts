"use strict";

import { Response, Request, NextFunction } from "express";
import mUtils from "../utils/commUtils";
import { default as Blog, BlogModel, LangLabels } from "../models/Blog";

export let getBlogs = async (req: Request, res: Response) => {
	const user = req.user;
	let _blogs;

    if (!user)
        res.redirect("/login");
    else {
		mUtils.userDefault(user, "profile.name", "解放鞋");
		
		_blogs = await Blog.find().exec();
		
        res.render("blog/blog_index", {
			title: "blog",
			blogs: _blogs
        });
    }
};

export let addBlog = (req: Request, res: Response) => {
    res.render("blog/blog_add", {
        title: "add blog"
    });
};

export let saveBlog = (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;

	const blog = new Blog({
		title: title,
		article: content,
		createDate: new Date()
	});

	if(title && content) {
		blog.save((err) => {
			if (err) { 
				return next(err); 
			}
			console.log(title);
			console.log(content);	
			res.redirect("/blog");
		});
	}
			

	// res.render("blog/blog_index", {
	// 	title: "blog index"
	// });
};