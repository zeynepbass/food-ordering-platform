import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import Logo from "@/components/common/Logo";
import SearchModal from "@/components/layout/SearchModal";
import { NAV_LINKS } from "@/constants/navigation";
import useToggle from "@/hooks/useToggle";
import { selectCartCount } from "@/redux/cartSlice";

const Header = () => {
  const router = useRouter();
  const cartCount = useSelector(selectCartCount);
  const [isMenuOpen, menu] = useToggle(false);
  const [isSearchOpen, search] = useToggle(false);

  return (
    <header
      className={`h-[5.5rem] z-50 relative ${
        router.pathname === "/" ? "bg-transparent" : "bg-secondary"
      }`}
    >
      <div className="container mx-auto text-white flex justify-between items-center h-full">
        <Logo />
        <nav
          className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white text-black sm:bg-transparent bg-white sm:flex ${
            isMenuOpen ? "grid place-content-center" : "hidden"
          }`}
        >
          <ul className="flex gap-x-2 sm:flex-row flex-col items-center">
            {NAV_LINKS.map(({ href, label }) => (
              <li
                key={href}
                className="px-[5px] py-[10px] uppercase hover:text-primary"
              >
                <Link href={href} onClick={menu.close}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {isMenuOpen && (
            <button
              type="button"
              aria-label="Close menu"
              className="absolute top-4 right-4 z-50"
              onClick={menu.close}
            >
              <GiCancel size={25} />
            </button>
          )}
        </nav>
        <div className="flex gap-x-4 items-center">
          <Link href="/auth/login" aria-label="Account">
            <FaUserAlt className="hover:text-primary transition-all" />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative">
            <FaShoppingCart className="hover:text-primary transition-all" />
            <span className="w-4 h-4 text-xs grid place-content-center rounded-full bg-primary absolute -top-2 -right-3 text-black font-bold">
              {cartCount}
            </span>
          </Link>
          <button type="button" aria-label="Search" onClick={search.open}>
            <FaSearch className="hover:text-primary transition-all" />
          </button>
          <Link href="/menu" className="btn-primary md:inline-block hidden">
            Order Online
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            className="sm:hidden inline-block"
            onClick={menu.open}
          >
            <GiHamburgerMenu className="text-xl hover:text-primary transition-all" />
          </button>
        </div>
      </div>
      {isSearchOpen && <SearchModal onClose={search.close} />}
    </header>
  );
};

export default Header;
