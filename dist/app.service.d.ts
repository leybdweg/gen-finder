import { OnModuleInit } from '@nestjs/common';
export declare class AppService implements OnModuleInit {
    readonly prefix = "AAAAAAAAAAA";
    private readonly tree;
    private readonly rootNode;
    constructor();
    onModuleInit(): Promise<any>;
    getGen(gen: string): boolean;
    private loadData;
}
