"use strict";

import { Response, Request, NextFunction } from "express";
import mUtils from "../utils/commUtils";
import { default as Blog, BlogModel, LangLabels } from "../models/Blog";
import { default as Lang, LangModel } from "../models/Lang";

/**
 * 
 * @param req 
 * @param res 
 */
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

/**
 * 
 * @param req 
 * @param res 
 */
export let addBlog = async (req: Request, res: Response, next: NextFunction) => {
	let _langs;

	await Lang.find({state: 1}, function(err: Error, langs: LangModel) {
		if(err)
			return next(err);
			
		if(langs)
			_langs = langs;
	});

    res.render("blog/blog_add", {
		title: "add blog",
		langs: _langs
    });
};

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
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
	
			res.redirect("/blog");
		});
	}
			

	// res.render("blog/blog_index", {
	// 	title: "blog index"
	// });
};