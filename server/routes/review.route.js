import express from 'express';
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js";
import tokkenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });

router.get(
    "/",
    tokkenMiddleware.auth,
    reviewController.getReviewOfUser,
);

router.post(
    "/",
    tokkenMiddleware.auth,
    body("mediaId")
        .exists().withMessage("mediaId is required")
        .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
    body("content")
        .exists().withMessage("content is required")
        .isLength({ min: 1 }).withMessage("content can not be empty"),
    body("mediaType")
        .exists().withMessage("mediaType is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaTitle")
        .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
        .exists().withMessage("mediaPoster is required"),
    requestHandler.validate,
    reviewController.create,
);

router.delete(
    "/:reviewId",
    tokkenMiddleware.auth,
    reviewController.remove,
);

export default router;
