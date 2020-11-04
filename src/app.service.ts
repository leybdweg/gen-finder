import {Injectable, OnModuleInit} from '@nestjs/common';
import * as fs from "fs";
import {promisify} from "util";
import * as TreeModel from "tree-model";

@Injectable()
export class AppService implements OnModuleInit {
    private readonly prefix = 'AAAAAAAAAAA'
    private readonly tree: any;
    private readonly rootNode: any;

    constructor() {
        this.tree = new TreeModel()
        this.rootNode = this.tree.parse({char: this.prefix})
    }

    async onModuleInit(): Promise<any> {
        const baseString = (await promisify(fs.readFile)(`${__dirname}/../gen.txt`)).toString();
        for (let i = 0; i < baseString.length; i++) {
            if (baseString[i] === 'A') {
                let prefixLength = this.prefix.length;
                let nextPrefixStillNotFound = true;
                const prefixFound = baseString.substr(i, prefixLength).split('').every( char => char === 'A') // TODO: consider thinking a more performance wise solution

                if (prefixFound) {
                    let k = i + prefixLength;
                    let lastNodeAdded = this.rootNode;
                    while (nextPrefixStillNotFound) {
                        const shouldStop = baseString.substr(k, prefixLength).split('').every( char => char === 'A') // TODO: consider thinking a more performance wise solution
                        if(baseString[k-1] !== 'A' && shouldStop){ // it's considered a stop point if some none prefix was found in it
                            nextPrefixStillNotFound = false;
                        } else {
                            let nodeChild = lastNodeAdded.children.find(child => child.model.char === baseString[k])
                            if(!nodeChild){
                                nodeChild = lastNodeAdded.addChild(this.tree.parse({char: baseString[k]}))
                            }
                            lastNodeAdded = nodeChild
                        }
                        k++;
                    }
                }
            }
        }
        // console.log('aaaaa\n')
        // console.log(JSON.stringify(this.rootNode.model))
        // console.log('aaaaa\n')
    }

    getHello(): string {
        return 'Hello World!';
    }
}
