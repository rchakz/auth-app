import { useEffect, useState } from "preact/hooks";

export default function User() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/user");
      setUser(await response.json());
    })();
  }, []);

  return (
    <>
      <pre>
        <p>
          Renderizado no cliente:
        </p>
        {JSON.stringify(user,null,2)}
      </pre>
    </>
  );
}
