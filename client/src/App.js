import React, {useEffect, useState} from 'react';
export default function App(){
  const [msg, setMsg] = useState('loading...');
  useEffect(()=>{
    fetch('/api/hello').then(r=>r.json()).then(d=>setMsg(d.message)).catch(()=>setMsg('Could not reach API'));
  },[]);
  return (
    <div style={{fontFamily:'Arial',padding:40}}>
      <h1>React + Node (Docker) — Demo</h1>
      <p>API says: <strong>{msg}</strong></p>
    </div>
  );
}
