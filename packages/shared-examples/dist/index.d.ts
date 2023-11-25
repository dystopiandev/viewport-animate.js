export declare type Example = {
    rule: string;
    name: string;
    duration: string;
    delay: string;
    iterations: string;
    repeat: string;
    shape: string;
} & Record<string, string>;

declare const Examples: ExamplesData;
export default Examples;

export declare type ExamplesData = {
    'data-attr': string;
    defaults: {
        duration: string;
        repeat: string;
        delay: string;
        iterations: string;
    } & Record<string, string>;
    "display-texts": {
        name: string;
        duration: string;
        delay: string;
        iterations: string;
        repeat: string;
    } & Record<string, string>;
    examples: Example[];
};

export { }
