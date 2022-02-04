import React from 'react';

function Input({ onClick, onChange }) {
    return (
        <div className="inputs-wrapper">
            <input type="date" id="date-input" name="age" onChange={onChange} />

            <button type="button" id="btn" onClick={onClick}>
                Calculate
            </button>
        </div>
    );
}
export default Input;
