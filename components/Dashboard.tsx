import { FunctionComponent } from "preact";
import PropsWithUser from "@/schemas/PropsWithUser.ts";

const Dashboard: FunctionComponent<PropsWithUser> = ({ children, user }) => {
  return (
    <div class="py-3 mb-10">
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      <p class="py-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique
        aspernatur eos dicta quo et ipsam eveniet nam rerum odit libero
        assumenda, eum expedita. Sed earum aliquid ipsa odio illo ipsam. Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Saepe debitis
        distinctio voluptas, optio suscipit inventore expedita omnis illo sunt
        obcaecati modi, reprehenderit dolorum deleniti maiores tenetur.
        Consequatur nemo hic tempora.
      </p>
    </div>
  );
};
export default Dashboard;
