import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckLogger = () => {
    const [status,setStatus] = useState(false);
    useEffect(() => {
        const StatusCheck = () => {
            axios
                .get("http://localhost:3001/api/tcp")
                .then((res) => {
                console.log(res);
                if(res.status === 200)
                    setStatus(true)
                    
            })
            .catch((err) => {
                console.log(err);
                setStatus(false)
            });
        };

        const interval10Second = setInterval(StatusCheck, 10000);

        return () => {
            clearInterval(interval10Second);
        };
    },[] );

    return (
        <div>
            <span style={{float:'right',marginRight:30}}>현재 상태: {status?'정상':'에러'}</span>
            <br/>
            <br/>
        </div>
    );
};

export default CheckLogger;