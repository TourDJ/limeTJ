"use strict";

import { Response, Request, NextFunction } from "express";
import mUtils from "../utils/commUtils";

export let getBlogs = (req: Request, res: Response) => {
    const user = req.user;

    if (!user)
        res.redirect("/login");
    else {
        mUtils.userDefault(user, "profile.name", "解放鞋");

        res.render("blog/blog_index", {
            title: "blog"
        });
    }
};