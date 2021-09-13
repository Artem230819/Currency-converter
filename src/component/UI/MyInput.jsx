import React from 'react';

const MyInput = ({onChange, ...props}) => {
    return (
        <input onChange={e => onChange(e.target.value)} type="number" {...props}/>
    );
}

export default MyInput;