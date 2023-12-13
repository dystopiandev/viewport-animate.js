export type Example = {
  rule: string;
  name: string;
  duration: string;
  delay: string;
  iterations: string;
  repeat: string;
  shape: string;
} & Record<string, string>;

export type ExamplesData = {
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

declare global {
  interface Window {
    EXAMPLES: ExamplesData;
  }
}

const Examples: ExamplesData = {
  "data-attr": "data-va",
  defaults: {
    duration: "1.65s",
    repeat: "false",
    delay: "0s",
    iterations: "0s",
  },
  "display-texts": {
    name: "Animation name:",
    duration: "Duration:",
    delay: "Delay:",
    iterations: "Iteration count:",
    repeat: "Repeat:",
  },
  examples: [
    {
      rule: "slideInDown +1.65s",
      name: "slideInDown",
      duration: "1.65s",
      delay: "0s",
      iterations: "0s",
      repeat: "false",
      shape: "circle",
    },
    {
      rule: "! jello +1s",
      name: "jello",
      duration: "1s",
      delay: "0s",
      iterations: "infinite",
      repeat: "N/A",
      shape: "square",
    },
    {
      rule: "*0.01 fadeInLeft 1x",
      name: "fadeInLeft",
      duration: "1s",
      delay: "0s",
      iterations: "1",
      repeat: "true",
      shape: "square",
    },
    {
      rule: "@0.1 rotateIn +2500ms 0.7x",
      name: "rotateIn",
      duration: "2.5s",
      delay: "0s",
      iterations: "0.7",
      repeat: "false",
      shape: "square",
    },
    {
      rule: "*0.1 fadeIn +5s -0.7s 0.235x",
      name: "fadeIn",
      duration: "5s",
      delay: "0.7s",
      iterations: "0.234",
      repeat: "true",
      shape: "square",
    },
  ],
};

(() => {
  if (typeof window !== "undefined") window.EXAMPLES = Examples;
})();

export default Examples;
