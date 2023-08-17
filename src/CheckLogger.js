import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckLogger = () => {
    const [serverStatus,setServerStatus] = useState(false);
    //const [loggerStatus,setLoggerStatus] = useState(false);
    useEffect(() => {
        const statusCheck = () => {
            axios
                .get("http://localhost:9000/api/tcp")
                .then((res) => {
                console.log(res);
                if(res.data === '1213f90000000000')
                    setServerStatus(true);
                else
                    serverStatus(false);
            })
            .catch((err) => {
                console.log(err);
                setServerStatus(false)
            });
        };

        const interval10Second = setInterval(statusCheck, 10000);

        return () => {
            clearInterval(interval10Second);
        };
    },[] );

    return (
        <div>
            <span style={{float:'right',marginRight:30}}>현재 상태: {serverStatus?'정상':'에러'}</span>
            <br/>
            <br/>
        </div>
    );
};

export default CheckLogger;