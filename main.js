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
const discord_js_1 = __importDefault(require("discord.js"));
const fs_1 = require("fs");
const deepl_1 = __importDefault(require("deepl"));
const client = new discord_js_1.default.Client();
const API_KEY = (0, fs_1.readFileSync)("./DEEPL_API_KEY", "utf8");
const TOKEN = (0, fs_1.readFileSync)("./BOT_TOKEN", "utf8");
const prefix = "!";
client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.content.startsWith(prefix))
        return;
    const [cmd, ...args] = message.content.slice(prefix.length).split(' ');
    if (cmd == 'translate') {
        onTranslate(args, message);
    }
}));
function onTranslate(targetMsg, message) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, deepl_1.default)({
            free_api: true,
            text: targetMsg,
            target_lang: 'JA',
            auth_key: API_KEY
        })
            .then(result => {
            message.channel.send(result.data.translations[0].text);
        });
    });
}
client.login(TOKEN);
