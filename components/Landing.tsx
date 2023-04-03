export default function Landing() {
  return (
    <>
      <h3 class="text-3xl py-3 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h3>
      <div class="flex py-6 w-full justify-center align-center">
        <a
          href="/auth/github"
          class="cursor-pointer flex items-center text-white bg-[#595959] hover:bg-[#606060] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 sdark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <img
            src="/github.svg"
            alt="Login com GitHub"
          />
          Login com GitHub
        </a>
      </div>

      <div class="flex py-0 w-full justify-center align-center">
        <a
          href="/auth/google"
          class="cursor-pointer flex items-center text-black bg-white hover:bg-[#EDEDED] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-20 sdark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <img
            src="/google.svg"
            alt="Login com Google"
          />
          Login com Goggle
        </a>
      </div>
    </>
  );
}
