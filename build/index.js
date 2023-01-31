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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./database/knex");
const Videos_1 = require("./models/Videos");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`);
});
app.get("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send({ message: "Pong!" });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/videos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        let videosDB;
        if (q) {
            const result = yield (0, knex_1.db)("videos").where("title", "LIKE", `%${q}%`);
            videosDB = result;
        }
        else {
            const result = yield (0, knex_1.db)("videos");
            videosDB = result;
        }
        const videos = videosDB.map((videoDB) => new Videos_1.Videos(videoDB.id, videoDB.title, videoDB.duration, videoDB.created_at));
        res.status(200).send(videos);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
//# sourceMappingURL=index.js.map