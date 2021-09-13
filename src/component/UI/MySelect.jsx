import React from 'react';

const MySelect = ({option, value, onChange, ...props}) => {

    return (
        <select
            {...props}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            {Object.keys(option).map((value, key) =>
                <option key={key} value={option[value]}>{value}</option>
            )}
        </select>
    );
}

export default MySelect;