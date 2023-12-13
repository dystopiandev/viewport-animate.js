// THIS ASSUMES THAT THE JSON HAS BEEN ADDED TO THE WINDOW

const examples = window.EXAMPLES;

function buildUi() {
  const target = document.querySelector(".scroll-container");
  const dataAttribute = examples["data-attr"];

  let count = 0;

  for(let example of examples["examples"]) {
    count += 1
    
    const section = document.createElement("section");
    const table = document.createElement("table");
    const tableBody = document.createElement("tbody");

    const tableHeadingContent = document.createElement("p");
    tableHeadingContent.innerText = `${examples['data-attr']}="${example.rule}"`;

    const tableHeading = document.createElement("th");
    tableHeading.colSpan = 2
    tableHeading.append(tableHeadingContent);

    const tableHeadingRow = document.createElement("tr");
    tableHeadingRow.append(tableHeading)

    tableBody.append(tableHeadingRow)

    const row = {
      ...example
    }

    delete row.shape;
    delete row.rule;

    // Create rows
    for (let key of Object.keys(row)) {
      const tableRow = document.createElement("tr");
      const property = document.createElement("th")
      property.classList.add("property")
      const value = document.createElement("td");
      value.classList.add("value")

      const isDefaultValue = row[key] === examples['defaults'][key]

      property.innerText = examples["display-texts"][key];
      value.innerHTML = `${row[key]}${isDefaultValue ? '<span>(default)</span>' : ''}`;

      tableRow.append(property);
      tableRow.append(value)

      tableBody.append(tableRow);
    }

    table.append(tableBody)

    const displayElement = document.createElement("div")
    displayElement.classList.add(example.shape);
    displayElement.classList.add('example-target')
    displayElement.setAttribute(dataAttribute, example.rule);

    const tableWrapper = document.createElement("div");
    tableWrapper.classList.add("table-container");
    tableWrapper.append(table)

    const viewNextExample = document.createElement('a');
    viewNextExample.classList.add("view-next-example")
    viewNextExample.innerText = "Next example";
    viewNextExample.setAttribute(dataAttribute, `slideInUp +0.3s -${example['duration']}`);
    viewNextExample.href = `#example-${count+1}`;

    section.id = `example-${count}`
    section.append(tableWrapper);
    section.append(displayElement);

    if (count >= examples['examples'].length) {
      viewNextExample.href = `#example-1`;
      viewNextExample.innerText = "Back to top";
      viewNextExample.classList.add("last")
    }

    section.append(viewNextExample);
    target.append(section);
  }
}

window.addEventListener("load", () => {
  buildUi()
  new ViewportAnimate({
    attribute: "data-va",
    observerThreshold: 0.01,
  }).init();
});
