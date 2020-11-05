"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const util_1 = require("util");
const TreeModel = require("tree-model");
let AppService = class AppService {
    constructor() {
        this.prefix = 'AAAAAAAAAAA';
        this.tree = new TreeModel();
        this.rootNode = this.tree.parse({ char: this.prefix });
    }
    async onModuleInit() {
        const baseString = await this.loadData();
        for (let i = 0; i < baseString.length; i++) {
            if (baseString[i] === 'A') {
                let prefixLength = this.prefix.length;
                let nextPrefixStillNotFound = true;
                const prefixFound = baseString.substr(i, prefixLength).split('').every(char => char === 'A');
                if (prefixFound) {
                    let k = i + prefixLength;
                    let lastNodeAdded = this.rootNode;
                    while (nextPrefixStillNotFound) {
                        const shouldStop = baseString.substr(k, prefixLength).split('').every(char => char === 'A');
                        if (baseString[k - 1] !== 'A' && shouldStop) {
                            nextPrefixStillNotFound = false;
                        }
                        else {
                            let nodeChild = lastNodeAdded.children.find(child => child.model.char === baseString[k]);
                            if (!nodeChild) {
                                nodeChild = lastNodeAdded.addChild(this.tree.parse({ char: baseString[k] }));
                            }
                            lastNodeAdded = nodeChild;
                        }
                        k++;
                    }
                }
            }
        }
    }
    getGen(gen) {
        let lastNodeChecked = this.rootNode;
        for (let i = this.prefix.length; i < gen.length; i++) {
            const nodeFound = lastNodeChecked.children.find(child => child.model.char === gen[i]);
            if (nodeFound) {
                lastNodeChecked = nodeFound;
            }
            else {
                return false;
            }
        }
        return true;
    }
    async loadData() {
        const baseString = await util_1.promisify(fs.readFile)(`${__dirname}/../gen.txt`);
        return baseString.toString();
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map