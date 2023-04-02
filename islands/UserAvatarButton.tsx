import { FunctionComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import PropsWithUser from "@/schemas/PropsWithUser.ts";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";

function getSocialProfile(user: UserWithSocialProfiles) {
  // TODO: definir social profile preferido após o login
  return user.social_profiles[0];
}

const UserAvatarButton: FunctionComponent<PropsWithUser> = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef(null);
  useEffect(() => {
    const blurListener = () => {
      setShowDropdown(false);
    };
    const focusListener = () => {
      setShowDropdown(true);
    };
    // const onclickListener = () => {
    //   setShowDropdown((current) => !current);
    // };
    if (buttonRef.current) {
      (buttonRef.current as HTMLDivElement).addEventListener(
        "focusout",
        blurListener,
      );
      (buttonRef.current as HTMLDivElement).addEventListener(
        "focusin",
        focusListener,
      );
      // (buttonRef.current as HTMLDivElement).addEventListener(
      //   "click",
      //   onclickListener,
      // );
    }
    (() => {
      if (buttonRef.current) {
        (buttonRef.current as HTMLDivElement).removeEventListener(
          "focusout",
          blurListener,
        );
        (buttonRef.current as HTMLDivElement).removeEventListener(
          "focusin",
          focusListener,
        );
      }
    });
  }, []);

  // if (!user) return null;

  if (!user)
    return (
      <div class="relative" >
        <a class="btn btn-info" href="/auth/github">
        <img
            src="/github.svg"
            class="w-6 h-6"
            alt="Login com GitHub"
          />
          Login
        </a>
      </div>
    );

  const socialProfile = getSocialProfile(user);

  return (
    <div class="relative" ref={buttonRef} tabIndex={1}>
      <button
        // ref={buttonRef}
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        class="text-white focus:ring-[#202030] font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center flex justify-center items-center gap-2"
        type="button"
        // onClick={() => setShowDropdown((current) => !current)}
      >
        <div>{user.display_name}</div>
        <div>
          <div class="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
            {socialProfile
              ? (
                <img
                  class="w-10 h-10 p-1 rounded"
                  src={socialProfile.avatar_url}
                  alt={socialProfile.username}
                />
              )
              : (
                <span class="font-medium text-gray-600 dark:text-gray-300">
                  {user.display_name[0].toUpperCase()}
                </span>
              )}
          </div>
        </div>
        <svg
          class={`ml-2 w-4 h-4 transition transition-transform ${
            showDropdown ? "rotate-180" : ""}`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          >
          </path>
        </svg>
      </button>
      <div
        id="dropdown"
        class={`${
          showDropdown ? "" : "hidden"
        } absolute mt-2 right-4 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}
      >
        <ul
          class="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          <li>
            <a 
              href="/logout" 
              class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              // onClick={(e) => {
              //   e.preventDefault();
              //   e.stopPropagation();
              // }}
              >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserAvatarButton;
