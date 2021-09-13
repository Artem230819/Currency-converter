import './App.css';
import React, {useState,useEffect} from "react";
import MySelect from "./component/UI/MySelect";
import MyInput from "./component/UI/MyInput";
import GetCurrency from "./API/GetCurrency";

function App() {
    const [currency,setCurrency] = useState([])
    const [selected, setSelected] = useState({oneSelect: '', twoSelect: ''})
    const [calc, setCalc] = useState({oneInput: '', twoInput: ''})



    async function fetchCurrency() {
        const result = await GetCurrency.getAll()
        setCurrency(result)
        setSelected({oneSelect: result.EUR, twoSelect: result.RUB})
    }
    useEffect(()=>{
        fetchCurrency()
    },[])


    const getThroughFormula = (a, b, c) => {
        return (a / b) * c
    }

    // left select
    const oneSelect = (e) => {
         setSelected({...selected, oneSelect: e})
         setCalc({...calc,   oneInput: calc.oneInput, twoInput: getThroughFormula( selected.twoSelect, e, calc.oneInput)})
    }
    // right select
    const twoSelect = (e) => {
         setSelected({...selected, twoSelect: e})
         setCalc({...calc,   oneInput: calc.oneInput, twoInput: getThroughFormula(e, selected.oneSelect, calc.oneInput)})
    }

    //left input
    const calcValueOne = (e) => {
        setCalc({...calc, oneInput: e, twoInput: getThroughFormula(selected.twoSelect, selected.oneSelect, e)})
    }
    // right input
    const calcValueTwo = (e) => {
        setCalc({...calc, oneInput: getThroughFormula(selected.oneSelect, selected.twoSelect, e), twoInput: e})
    }

    const swap = (event) => {
        event.preventDefault()
        setSelected({...selected, oneSelect: selected.twoSelect, twoSelect: selected.oneSelect})
        setCalc({...calc, oneInput: calc.twoInput, twoInput: calc.oneInput })
    }

  return (
    <div className="App">
            <h1 className={"App__title"}>Конвертер валют</h1>
            <div className={"App__wrapper"}>
                <div className={"App__items-wrapper App__select-wrapper"}>
                    <MySelect className={"App__item"} value={selected.oneSelect} option={currency} onChange={oneSelect} />
                    <span>в</span>
                    <MySelect className={"App__item"} value={selected.twoSelect} option={currency} onChange={twoSelect}/>
                </div>
                <div className={"App__items-wrapper App__input-wrapper"}>
                    <MyInput className={"App__item"} value={calc.oneInput} onChange={calcValueOne} />
                    <span>=</span>
                    <MyInput className={"App__item"} value={calc.twoInput} onChange={calcValueTwo} />
                </div>
            </div>
            <span className={"App__btn"} onClick={swap}>поменять валюты местами</span>
    </div>
  );
}

export default App;
