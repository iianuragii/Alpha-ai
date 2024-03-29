import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [log, setLog] = useState("");
    const getData = async() =>{
        const response = await axios.get("http://localhost:5000/login")
        setLog(response.data);
    }

    useEffect(() => {
      getData();
    }, [])    
    
  return (
    <div>
        {log}
    </div>
  )
}

export default Login