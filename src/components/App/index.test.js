import React from "react";
import App from "Components/App";
import { shallow } from "enzyme";

class FakeDataFeed {
  _interval = null;

  onFrequencyFound = null;

  start() {
    this.foundFrequency();
  }

  stop() {}

  foundFrequency() {
    this.onFrequencyFound({
      frequency: 440,
      note: "A4",
      cents: 0
    });
  }
}

describe("<App />", () => {
  it("renders a row with the found frequency", () => {
    const wrapper = shallow(<App dataFeed={new FakeDataFeed()} />);
    const row = wrapper.find("tr").at(0);

    expect(row.find("td")).toHaveLength(2);
    expect(
      row
        .find("td")
        .first()
        .text()
    ).toEqual("Frequency");
    expect(
      row
        .find("td")
        .last()
        .text()
    ).toEqual("440");
  });
  it("renders a row with the found note", () => {
    const wrapper = shallow(<App dataFeed={new FakeDataFeed()} />);
    const row = wrapper.find("tr").at(1);

    expect(row.find("td")).toHaveLength(2);
    expect(
      row
        .find("td")
        .first()
        .text()
    ).toEqual("Note");
    expect(
      row
        .find("td")
        .last()
        .text()
    ).toEqual("A4");
  });
  it("renders a row with the found cents", () => {
    const wrapper = shallow(<App dataFeed={new FakeDataFeed()} />);
    const row = wrapper.find("tr").at(2);

    expect(row.find("td")).toHaveLength(2);
    expect(
      row
        .find("td")
        .first()
        .text()
    ).toEqual("Cents");
    expect(
      row
        .find("td")
        .last()
        .text()
    ).toEqual("0");
  });
});
