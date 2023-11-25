import type { Example, ExamplesData } from "shared-examples";
import Row from "./Row.tsx";
import examplesData from "shared-examples"

type Props = {
  example: Example;
};

function Table({ example }: Props) {
  const DEFAULTS: ExamplesData["defaults"] = examplesData["defaults"];
  const displayTexts: ExamplesData["display-texts"] = examplesData["display-texts"];
  const displayTextsKeys = Object.keys(displayTexts);
  
  return (
    <div className="table-container">
      <table>
        <tbody>
          <tr>
            <th colSpan={2}>
              <p>{`${examplesData['data-attr']}="${example.rule}"`}</p>
            </th>
          </tr>
          {Object.keys(example)
            .filter((key) => displayTextsKeys.includes(key))
            .map((rowKey, index) => (
              <Row
                key={`${example.rule}-row-${index}`}
                property={displayTexts[rowKey]}
                value={example[rowKey].toString()}
                isDefault={DEFAULTS[rowKey] == example[rowKey].toString()}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
