import {Injectable, OnModuleInit} from '@nestjs/common';
import * as fs from "fs";
import {promisify} from "util";
import * as TreeModel from "tree-model";

@Injectable()
export class AppService implements OnModuleInit {
    private readonly prefix = 'AAAAAAAAAAA'
    private readonly tree: any;
    private rootNode: any;
    private manualTree: {};

    constructor() {
        this.tree = new TreeModel()
        this.manualTree = {}
        this.manualTree[this.prefix] = {}
        this.rootNode = this.tree.parse({char: this.prefix})
    }

    async onModuleInit(): Promise<any> {
        const baseString = await promisify(fs.readFile)(`${__dirname}/../gen.txt`).toString();
        for (let i = 0; i < baseString.length; i++) {
            if (baseString[i] === 'A') {
                let prefixLength = this.prefix.length;
                let nextPrefixLength = this.prefix.length;
                let genFound = false;
                let prefixFound = false;
                let nexPrefixFound = true;
                let prefixFinishedAt;
                // let nextPrefixStartAt = 0;
                // let gotToNextPrefix = false;
                for (let j = i; j < (i + prefixLength); j++) {
                    if (baseString[j] === 'A') {
                        nextPrefixLength--;
                    }
                    if (nextPrefixLength === 0) {
                        prefixFinishedAt = j;
                        prefixFound = true;
                    }
                }
                if (prefixFound) {
                    let k = prefixFinishedAt;
                    // let lastNodeAdded = this.rootNode;
                    let lastNodeAdded = this.rootNode;
                    while (nexPrefixFound) {
                        k++;
                        const shouldStop = baseString.substr(k, prefixLength).split('').every( char => char === 'A') // TODO: consider thinking a more performance wise solution
                        if(baseString[k-1] !== 'A' && shouldStop){ // it's considered a stop point if some none prefix was found in it
                            nexPrefixFound = false;
                        } else {
                            let nodeChild = lastNodeAdded.children.find(child => child.char === baseString[k])
                            if(!nodeChild){
                                nodeChild = lastNodeAdded.addChild(this.tree.parse({char: baseString[k]}))
                            }
                            lastNodeAdded = nodeChild
                        }
                    }
                }
            }
        }
        console.log('aaaaa\n')
        console.log(JSON.stringify(this.rootNode.model))
        console.log('aaaaa\n')
    }

    private addChildren(data, key) {
        if (data[key]) {

        }
    }

    private findStartAndEndOfGen(ix): number[] {
        let genStart;
        let genFinish;
        for (ix; ix < (ix + this.prefix.length); ix++) {

        }
        return [genStart, genFinish]
    }

    getHello(): string {
        return 'Hello World!';
    }
}
