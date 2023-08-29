import React, { useState } from 'react';

const ReadPubkey = () => {
    const buttonMsg = ['generate key','request share','regenerate key, share','encrypt data','decrypt data'];
    const [count, setCount] = useState(0);

    const testFunc = () => {
        setCount(count + 1);
    }
    return (
        <div>
            <button onClick={testFunc}>{buttonMsg[count]}</button>
        </div>
    );
};

export default ReadPubkey;