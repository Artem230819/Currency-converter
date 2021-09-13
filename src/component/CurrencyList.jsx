import React from 'react';

const CurrencyList = ({state, arr,...props}) => {
    return (
        <select {...props}>
            {arr.map( value =>
                <option  onChange={e => setState(e.target.value)} >{value.a}</option>
            )}
        </select>
    );
};

export default CurrencyList;