declare module 'd3-org-chart' {
    export class OrgChart {
        container(value: string | HTMLElement): this;
        data(value: any[]): this;
        nodeWidth(value: (d: any) => number): this;
        nodeHeight(value: (d: any) => number): this;
        childrenMargin(value: (d: any) => number): this;
        compactMarginBetween(value: (d: any) => number): this;
        compactMarginPair(value: (d: any) => number): this;
        nodeContent(value: (d: any, i: any, arr: any, state: any) => string): this;
        render(): this;
        fit(): this;
        [key: string]: any;
    }
}
