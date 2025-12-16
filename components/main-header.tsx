import Image from "next/image";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <header className="bg-[#b197fc] py-[10px] px-[20px]">
      <div className="flex items-center">
        
        {/* LEWA – logo */}
        <div className="flex items-center">
          <NavLink href="/">
            <Image
              src="/politechnika-krakowska-logo.svg"
              alt="Logo Politechniki Krakowskiej"
              height={50}
              width={50}
            />
          </NavLink>
        </div>

        {/* ŚRODEK – menu */}
        <nav className="flex-1 flex justify-center">
        <ul className="flex items-center gap-20 text-lg font-medium">
            <li><NavLink href="/product-list">Produkty</NavLink></li>
            <li><NavLink href="/basket">Koszyk</NavLink></li>
            <li><NavLink href="/order-history">Historia zakupów</NavLink></li>
            <li><NavLink href="/about">O nas</NavLink></li>
        </ul>
        </nav>

        {/* PRAWA – pusta kolumna (balans) */}
        <div className="w-[50px]" />
      </div>
    </header>
  );
}
