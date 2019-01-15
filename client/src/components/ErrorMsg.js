import React from 'react';

const ErrorMsg = ({ errors, type  }) => (
    <>
    {
      errors && errors
        .filter(err => err.type === type)
        .map(err => (
          <div key={err.id}>
            <small className="text-danger ml-2">{err.msg}</small>
            <br />
          </div>
        ))
    }
    </>
);


export default ErrorMsg;