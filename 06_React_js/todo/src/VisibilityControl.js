import React, {useState} from 'react';

function VisibilityControl(props){
    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" checked={props.isChecked} onChange={(event) => props.callback(event.target.checked)} />
            <label className="form-check-label">
                Show { props.description}
            </label>
        </div>
    );
}

export default VisibilityControl;