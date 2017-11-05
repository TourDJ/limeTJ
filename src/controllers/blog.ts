"use strict";

import { Response, Request, NextFunction } from "express";

export let getBlogs = (req: Request, res: Response) => {
    let user = req.user

    if(!user) 
        res.redirect("/login")
    else
        res.render("blog/blog_index", {
            title: "blog"
        });
};