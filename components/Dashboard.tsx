import { FunctionComponent } from "preact";
import PropsWithUser from "@/schemas/PropsWithUser.ts";
import User from "@/islands/User.tsx";

const Dashboard: FunctionComponent<PropsWithUser> = ({ children, user }) => {
  return (
    <div class="flex gap-2 w-full py-2">
      <pre>
        <p>
          Renderizado no servidor:
        </p>
        {JSON.stringify(user,null,2)}
      </pre>
      <User />
    </div>
  );
};
export default Dashboard;
