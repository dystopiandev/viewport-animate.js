import { useEffect } from "react";
import { ViewportAnimate } from "viewport-animate";
import Table from "./components/Table.tsx";

import examplesData from "@examples/shared";

function App() {
  useEffect(() => {
    new ViewportAnimate({
      attribute: "data-va",
      observerThreshold: 0.01,
    }).init();
    console.log("hello");
  }, []);
  return (
    <>
      {examplesData["examples"].map((example, index, examples) => (
        <section key={`example-${index}`} id={`example-${index + 1}`}>
          <Table example={example} />
          <div
            className={"example-target " + example.shape}
            data-va={example.rule}
          ></div>
          <a
            href={`#example-${index + 1 < examples.length ? index + 2 : "1"}`}
            className={
              "view-next-example " +
              (index + 1 >= examples.length ? "last" : "")
            }
            data-va={`slideInUp +0.3s -${example.duration}`}
          >
            {index + 1 == examples.length ? "Back to top" : "Next example"}
          </a>
        </section>
      ))}
    </>
  );
}

export default App;
