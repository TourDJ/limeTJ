"use strict";

import { Response, Request, NextFunction } from "express";
import mUtils from "../utils/commUtils";
import { default as Blog, BlogModel, LangLabels } from "../models/Blog";
import { default as Lang, LangModel } from "../models/Lang";
import Types, {Open} from "../utils/Types";

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
 * 转向新增日志页面
 * @param req 
 * @param res 
 */
export let addBlog = async (req: Request, res: Response, next: NextFunction) => {
	let _langs: [LangModel], 
		name: string,
		names: any = {};

	await Lang.find({"state": 1}, {langId: 1, langName: 1, _id: 0}, function(err: Error, langs: [LangModel]) {
		if(err)
			return next(err);
			
		if(langs)
			_langs = langs;
	});

	if(_langs && _langs instanceof Array) {
		_langs.forEach(function(_obj: any) {
			let lang: LangModel;
			if(_obj && _obj._doc) {
				lang = _obj._doc;
				name = lang.langName;
				names[name] = {
					id: lang.langId,
					name: name
				}
			}
		});
	}

    res.render("blog/blog_add", {
		title: "add blog",
		langs: names,
		types: Types,
		open: Open
    });
};

/**
 * 保存日志
 * @param req 
 * @param res 
 * @param next 
 */
export let saveBlog = (req: Request, res: Response, next: NextFunction) => {
	const { title, content, creator, createDate, labels, open, catalog } = req.body;
	let open2, catalog2;

	try {
		open2 = parseInt(open , 10);
		catalog2 = parseInt(catalog, 10);
	} catch (error) {
		open2 = -1;
		catalog2 = -1;
	}

	const blog = new Blog({
		title: title,
		article: content,
		createDate: createDate,
		creator: creator,
		labels: labels,
		open: open2,
		catalog: catalog2,
		cntRead: 0,
		cntComment: 0
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
