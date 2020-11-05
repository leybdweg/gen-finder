import {Injectable, OnModuleInit} from '@nestjs/common';
import * as fs from "fs";
import {promisify} from "util";
import * as TreeModel from "tree-model";

@Injectable()
export class AppService implements OnModuleInit {
    public readonly prefix = 'AAAAAAAAAAA'
    private readonly tree: any;
    private readonly rootNode: any;

    constructor() {
        this.tree = new TreeModel()
        this.rootNode = this.tree.parse({char: this.prefix})
    }

    async onModuleInit(): Promise<any> {
        const baseString = await this.loadData();
        this.dataProcess(baseString);
    }

    getGen(gen: string): boolean {
        let lastNodeChecked = this.rootNode;
        for (let i = this.prefix.length; i < gen.length; i++) {
            const nodeFound = lastNodeChecked.children.find(child => child.model.char === gen[i])
            if (nodeFound) {
                lastNodeChecked = nodeFound;
            } else {
                return false;
            }
        }
        return true;
    }

    private dataProcess(baseString: string) {
        for (let i = 0; i < baseString.length; i++) {
            if (baseString[i] === 'A' && this.isPrefix(baseString.substr(i, this.prefix.length))) {
                let nextPrefixStillNotFound = true;
                let genAt = i + this.prefix.length;
                let lastNodeAdded = this.rootNode;

                while (nextPrefixStillNotFound && genAt <= baseString.length) {
                    if (baseString[genAt - 1] !== 'A' && this.isPrefix(baseString.substr(genAt, this.prefix.length))) { // it's considered a stop point if some none prefix was found in it
                        nextPrefixStillNotFound = false;
                    } else {
                        lastNodeAdded = lastNodeAdded.children.find(child => child.model.char === baseString[genAt]) ?? lastNodeAdded.addChild(this.tree.parse({char: baseString[genAt]}))
                    }
                    genAt++;
                }
            }
        }
    }

    private isPrefix(str: string): boolean {
        return !str.match(/[^A]/);  // TODO: consider thinking a more performance wise solution
    }

    private async loadData(): Promise<string> {
        const baseString = await promisify(fs.readFile)(`${__dirname}/../gen.txt`);
        return baseString.toString();
    }

}
