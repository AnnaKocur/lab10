import Image from "next/image";
import { SignIn, SignOut } from "@/components/auth-components";

export default function Home() {
  return (
    <div className="text-center mt-10 flex justify-center items-center flex-col h-full">
      <Image
        className="mb-5"
        src="/politechnika-krakowska-logo.svg"
        alt="Logo Politechniki Krakowskiej"
        height={250}
        width={250}
        priority
      />

      <div className="px-5 py-3 text-[#5a4fcf] text-[22px]">
        Witaj na stronie sklepu komputerowego Anny Kocur
      </div>

      {/* 🔐 AUTH BUTTONS */}
      <div className="mt-6 flex gap-4">
        <SignIn provider="github" />
        <SignOut />
      </div>
    </div>
  );
}
