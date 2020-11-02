import {Injectable, OnModuleInit} from '@nestjs/common';
import * as fs from "fs";
import {promisify} from "util";
import Tree from "tree-data-structure";

@Injectable()
export class AppService implements OnModuleInit {
    private readonly prefix = 'AAAAAAAAAAA'
    private readonly tree: any;

    constructor() {
        this.tree = new Tree('root')
    }

    async onModuleInit(): Promise<any> {
        const baseString = await promisify(fs.readFile)(`${__dirname}/../gen.txt`).toString();
        for (let i = 0; i < baseString.length; i++) {
            if (baseString[i] === 'A') {
                let prefixLength = this.prefix.length;
                let nextPrefixLength = this.prefix.length;
                for(let j = i; j < (i + prefixLength); j++){
                    if(baseString[j] === 'A' && prefixLength > 0){
                        prefixLength--;
                    }
                    if(baseString[j - 1] === 'A' && baseString[j] === 'A' && prefixLength === 0){
                        nextPrefixLength--;
                    }
                    if(nextPrefixLength === 0){
                        // next prefix achieved, get out of loop
                        break;
                    }

                    if(prefixLength === 0){
                        // prefix already found, start adding to tree
                    }
                }
            }
        }
    }

    addChildren(data, key) {
        if (data[key]) {

        }
    }

    getHello(): string {
        return 'Hello World!';
    }
}
