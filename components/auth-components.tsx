import { signIn, signOut } from "@/lib/auth";

const buttonClass = `
  px-6 py-2
  rounded-xl
  border-2
  border-[#5a4fcf]
  text-[#5a4fcf]
  font-medium
  shadow-sm
  transition-all
  duration-200
  hover:bg-[#5a4fcf]
  hover:text-white
  hover:scale-105
`;


export function SignIn({ provider }: { provider: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button className={buttonClass}>
        Zaloguj się z GitHub
      </button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className={buttonClass}>
        Wyloguj się
      </button>
    </form>
  );
}
