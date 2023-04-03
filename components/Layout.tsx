import { FunctionComponent } from "preact";
import NavBar from "./NavBar.tsx";
import PropsWithUser from "@/schemas/PropsWithUser.ts";

const Layout: FunctionComponent<PropsWithUser> = ({ children, user }) => {
  return (
    <div class="w-screen h-screen overflow-hidden bg-github text-white">
      <NavBar user={user} />
      <main class="px-2 sm:px-4 h-[90%] overflow-auto">
        {children}
      </main>
    </div>
  );
};
export default Layout;
