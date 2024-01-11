import { useEffect, useState } from "react";
import "./App.css";

export const App = () => {
  const [count, setCount] = useState(0);
  const [uuid, setUuid] = useState<string>('');

  const func = async () => {
    const response = await (window as any).si.system()
    setUuid(response.uuid)
  }

  useEffect(() => { func() }, [])

  return (
    <div className="container">
      <div>{uuid}</div>
      <h1>{count}</h1>
      <button onClick={() => setCount((count) => count + 1)}>Count</button>
    </div>
  );
};
