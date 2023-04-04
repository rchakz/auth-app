import PropsWithUser from "@/schemas/PropsWithUser.ts";
import { FunctionalComponent } from "preact";
import UserAvatarButton from "@/islands/UserAvatarButton.tsx";

const NavBar: FunctionalComponent<PropsWithUser> = ({ user }) => {
  {/* TODO:  config twind com temas de cores */}
  return (
    <nav class="relative bg-[#595959] px2 sm:px-4 py-2.5 flex justify-between">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" class="flex items-center">
          <img
            src="/logo.svg"
            class="ml-4"
            alt="Home"
          />
          <span class="self-center text-xl font-semibold whitespace-nowrap">
            Auth App
          </span>
        </a>
      </div>
      {<UserAvatarButton user={user} />}
    </nav>
  );
};

export default NavBar;
