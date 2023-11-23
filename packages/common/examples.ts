import examples from './examples.json';

export type Example = {
  rule: string;
  name: string;
  duration: string;
  delay: string;
  iterations: string;
  repeat: string;
  shape: string;
} & Record<string, string>;

export interface ExamplesData {
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
  } & Record<string, string>,
  examples: Example[]
}

export default examples as ExamplesData;

