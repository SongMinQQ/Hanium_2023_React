import React, { useState, useEffect } from 'react';
import axios from 'axios';
import'./App.css'

const CheckLogger = () => {
    const [serverStatus,setServerStatus] = useState(true);
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
        <div className='status'>
            <div><span /*style={{float:'right',marginRight:30}}*/>Server status  : &nbsp;{serverStatus?<div className='greenCircle'></div>:<div className='redCircle'></div>}</span></div>
            <br/>
            <p><span /*style={{float:'right',marginRight:30}}*/>Logger status  : &nbsp;{serverStatus?<div className='greenCircle'></div>:<div className='redCircle'></div>}</span></p>
        </div>
    );
};

export default CheckLogger;