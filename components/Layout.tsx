import { FunctionComponent } from "preact/src/index.js";
import NavBar from "./NavBar.tsx";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div class="w-screen h-screen overflow-hidden bg-[#1C1C1C] text-white">
      <NavBar />
      <main class="px2 sm:px-4">
        {children}
      </main>
    </div>
  );
};
export default Layout;
