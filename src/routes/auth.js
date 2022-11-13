"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const stripe_1 = require("../utils/stripe");
const checkAuth_1 = require("../middleware/checkAuth");
const router = express.Router();
router.post("/signup", (0, express_validator_1.body)("email").isEmail().withMessage("The email is invalid"), (0, express_validator_1.body)("password").isLength({ min: 5 }).withMessage("The password is too short"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => {
            return {
                msg: error.msg,
            };
        });
        return res.json({ errors, data: null });
    }
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (user) {
        return res.json({
            errors: [
                {
                    msg: "Email already in use",
                },
            ],
            data: null,
        });
    }
    const hashedPassword = yield bcrypt.hash(password, 10);
    const customer = yield stripe_1.stripe.customers.create({
        email,
    }, {
        apiKey: process.env.STRIPE_SECRET_KEY,
    });
    const newUser = yield user_1.default.create({
        email,
        password: hashedPassword,
        stripeCustomerId: customer.id,
    });
    const token = yield JWT.sign({ email: newUser.email }, process.env.JWT_SECRET, {
        expiresIn: 360000,
    });
    res.send({
        errors: [],
        data: {
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                stripeCustomerId: customer.id,
            },
        },
    });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return res.json({
            errors: [
                {
                    msg: "Invalids credentials",
                },
            ],
            data: null,
        });
    }
    const isMatch = yield bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({
            errors: [
                {
                    msg: "Invalids credentials",
                },
            ],
            data: null,
        });
    }
    const token = yield JWT.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: 360000,
    });
    return res.json({
        errors: [],
        data: {
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        },
    });
}));
router.get("/me", checkAuth_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email: req.user });
    return res.json({
        errors: [],
        data: {
            user: {
                id: user._id,
                email: user.email,
                stripeCustomerId: user.stripeCustomerId,
            },
        },
    });
}));
exports.default = router;
