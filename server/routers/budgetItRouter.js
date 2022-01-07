import express from "express";
import expressAsyncHandler from "express-async-handler";
import budgetIt from "../models/budgetItModel.js";

const budgetItRouter = express.Router();

budgetItRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    // Some Code in here
    const item_type = await budgetIt.find({});
    if (item_type) {
      return res.send(item_type);
    }
    return res.send("placeholder");
  })
);

export default budgetItRouter;
