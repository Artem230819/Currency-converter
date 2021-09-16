import React, { useState, useEffect } from "react";
import {
  DEFAULT_CURRENCY_VALUES,
  DEFAULT_INPUT_VALUE,
  DEFAULT_SELECTED_VALUES,
} from "../../defaultValue/defaultValue";
import getCurrencyRates from "../../API/getCurrencyRates";
import CurrencyInput from "./component/CurrencyInput";
import CurrencySelect from "./component/CurrencySelect";

export default function CurrencyConvertor() {
  const [currencyValues, setCurrencyValues] = useState(DEFAULT_CURRENCY_VALUES);
  const [inputValue, setInputValue] = useState(DEFAULT_INPUT_VALUE);
  const [selectedValues, setSelectedValues] = useState(DEFAULT_SELECTED_VALUES);

  useEffect(() => {
    getCurrencyRates().then((result) => {
      setCurrencyValues(result);
    });
  }, []);

  const getThroughFormula = () => {
    return (
      (currencyValues[selectedValues.fromSelect] /
        currencyValues[selectedValues.toSelect]) *
      inputValue
    );
  };

  const handleChangeSelect = (fromSelect, toSelect, isToSelect) => {
    isToSelect
      ? setSelectedValues({ ...selectedValues, fromSelect: fromSelect })
      : setSelectedValues({ ...selectedValues, toSelect: toSelect });
  };

  const handleChangeInput = (e) => {
    setInputValue(e);
  };

  const swap = () => {
    setSelectedValues({
      fromSelect: selectedValues.toSelect,
      toSelect: selectedValues.fromSelect,
    });
  };

  return (
    <div className="App">
      <h1 className={"App__title"}>Конвертер валют</h1>
      <div className={"App__wrapper"}>
        <div className={"App__items-wrapper App__select-wrapper"}>
          <CurrencySelect
            className={"App__item"}
            value={selectedValues.fromSelect}
            option={currencyValues}
            onChange={(event) =>
              handleChangeSelect(
                event.target.value,
                selectedValues.toSelect,
                true
              )
            }
          />
          <span>в</span>
          <CurrencySelect
            className={"App__item"}
            value={selectedValues.toSelect}
            option={currencyValues}
            onChange={(event) =>
              handleChangeSelect(
                selectedValues.fromSelect,
                event.target.value,
                false
              )
            }
          />
        </div>
        <div className={"App__items-wrapper App__input-wrapper"}>
          <CurrencyInput
            className={"App__item"}
            value={inputValue}
            onChange={(event) => handleChangeInput(event.target.value)}
          />
          <span>=</span>
          <CurrencyInput
            className={"App__item"}
            readOnly={true}
            value={getThroughFormula()}
          />
        </div>
      </div>
      <span className={"App__btn"} onClick={swap}>
        поменять валюты местами
      </span>
    </div>
  );
}
