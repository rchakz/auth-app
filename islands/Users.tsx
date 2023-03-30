import { useEffect, useState } from "preact/hooks";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // console.log('componente montado');
    (async () => {
      const response = await fetch("/api/users");
      setUsers(await response.json());
    })();
  }, []);

  return (
    <div class="flex gap-2 w-full">
      <p class="my-6">
        *Renderizado no cliente.* Usuários: {users.length}
      </p>
    </div>
  );
}
