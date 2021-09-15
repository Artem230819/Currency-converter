import React, { useState, useEffect } from "react";
import {
  DEFAULT_CURRENCY_VALUE,
  DEFAULT_INPUT_VALUE,
  DEFAULT_SELECTED_VALUE,
} from "../../defaultValue/defaultValue";
import getCurrencyRates from "../../API/getCurrencyRates";
import CurrencyInput from "./component/CurrencyInput";
import CurrencySelect from "./component/CurrencySelect";

export default function CurrencyConvertor() {
  const [currencyValue, setCurrencyValue] = useState(DEFAULT_CURRENCY_VALUE);
  const [inputValue, setInputValue] = useState(DEFAULT_INPUT_VALUE);
  const [selectedValue, setSelectedValue] = useState(DEFAULT_SELECTED_VALUE);

  useEffect(() => {
    (async function fetchCurrency() {
      const result = await getCurrencyRates();
      setCurrencyValue(result);
      setInputValue({
        ...inputValue,
        fromInput: inputValue.fromInput,
        toInput: getThroughFormula(
          result[selectedValue.toSelect],
          result[selectedValue.fromSelect],
          inputValue.fromInput
        ),
      });
    })();
  }, []);

  useEffect(() => {
    setInputValue({
      ...inputValue,
      fromInput: inputValue.fromInput,
      toInput: getThroughFormula(
        currencyValue[selectedValue.toSelect],
        currencyValue[selectedValue.fromSelect],
        inputValue.fromInput
      ),
    });
  }, [selectedValue]);

  const getThroughFormula = (selectValue, anotherSelectValue, input) => {
    return (selectValue / anotherSelectValue) * input;
  };

  const handleChangeSelect = (fromSelect, toSelect, select) => {
    if (select === "from") {
      setSelectedValue({ ...selectedValue, fromSelect: fromSelect });
    } else if (select === "to") {
      setSelectedValue({ ...selectedValue, toSelect: toSelect });
    }
  };

  const handleChangeInput = (fromInput, toInput, input) => {
    if (input === "from") {
      setInputValue({
        ...inputValue,
        fromInput: fromInput,
        toInput: getThroughFormula(
          currencyValue[selectedValue.toSelect],
          currencyValue[selectedValue.fromSelect],
          fromInput
        ),
      });
      console.log(input);
    } else {
      setInputValue({
        ...inputValue,
        fromInput: getThroughFormula(
          currencyValue[selectedValue.fromSelect],
          currencyValue[selectedValue.toSelect],
          toInput
        ),
        toInput: toInput,
      });
      console.log(input);
    }
  };

  const swap = (event) => {
    event.preventDefault();
    setSelectedValue({
      ...selectedValue,
      fromSelect: selectedValue.toSelect,
      toSelect: selectedValue.fromSelect,
    });
    setInputValue({
      ...inputValue,
      fromInput: inputValue.toInput,
      toInput: inputValue.fromInput,
    });
  };

  return (
    <div className="App">
      <h1 className={"App__title"}>Конвертер валют</h1>
      <div className={"App__wrapper"}>
        <div className={"App__items-wrapper App__select-wrapper"}>
          <CurrencySelect
            className={"App__item"}
            value={selectedValue.fromSelect}
            option={currencyValue}
            onChange={(event) =>
              handleChangeSelect(
                event.target.value,
                selectedValue.toSelect,
                "from"
              )
            }
          />
          <span>в</span>
          <CurrencySelect
            className={"App__item"}
            value={selectedValue.toSelect}
            option={currencyValue}
            onChange={(event) =>
              handleChangeSelect(
                selectedValue.fromSelect,
                event.target.value,
                "to"
              )
            }
          />
        </div>
        <div className={"App__items-wrapper App__input-wrapper"}>
          <CurrencyInput
            className={"App__item"}
            value={inputValue.fromInput}
            onChange={(event) =>
              handleChangeInput(event.target.value, inputValue.toInput, "from")
            }
          />
          <span>=</span>
          <CurrencyInput
            className={"App__item"}
            value={inputValue.toInput}
            onChange={(event) =>
              handleChangeInput(inputValue.fromInput, event.target.value, "to")
            }
          />
        </div>
      </div>
      <span className={"App__btn"} onClick={swap}>
        поменять валюты местами
      </span>
    </div>
  );
}
