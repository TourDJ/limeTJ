"use strict";

import { Response, Request, NextFunction } from "express";
import mUtils from "../utils/commUtils";
import { default as Blog, BlogModel } from "../models/Blog";
import { default as Lang, LangModel } from "../models/Lang";
import Types, {Open} from "../utils/Types";
import * as moment from 'moment';

/**
 * 博客首页
 * @param req 
 * @param res 
 */
export let getBlogs = async (req: Request, res: Response) => {
	const user = req.user;
	let _blogs: any, _langs: any, lang: any, langObj: any;

    if (!user)
        res.redirect("/login");
    else {
		mUtils.setDefaultInfo(user);

		_langs = await Lang.find({}, {langId: 1, langName: 1, _id: 0});
		if(_langs && _langs instanceof Array) {
			lang = {};
			_langs.forEach(function(elem: LangModel, index: Number) {
				if(elem) {
					lang[elem.langId] = elem;
				}
			});
		}
		
		_blogs = await Blog.aggregate(
			{ 
				$match : { status: 1 } 
			},
			{
				$project: {
					"title" : 1, 
					"article" : 1, 
					"createDate" : {$dateToString: {format: "%Y-%m-%d %H:%M:%S", date: "$createDate"}}, 
					"creator" : 1, 
					"labels" : {$split: ["$labels", ","]}, 
					"open" : 1, 
					"catalog" : 1, 
					"cntRead" : 1, 
					"cntComment" : 1,  
					"status" : 1
				}
			}
		);
		if(lang && _blogs && _blogs instanceof Array) {
			let _lang_: Array<String>, _langName_: Array<String>;
			_blogs.forEach(function(blog: BlogModel, index: Number) {
				if(blog) {
					_lang_ = blog.labels;
					_langName_ = [];
					if(_lang_ && _lang_ instanceof Array){
						_lang_.forEach(function(str: string) {
							langObj = lang[str];
							if(langObj) {
								_langName_.push(langObj.langName)
							}
						});
					}
					blog["langName"] = _langName_;
				}
			});
		}
		console.log(user)
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
