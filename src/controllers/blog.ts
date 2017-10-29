"use strict";

import { Response, Request, NextFunction } from "express";

export let getBlogs = (req: Request, res: Response) => {
    res.render("blog/blog_index", {
        title: "blog"
    });
};