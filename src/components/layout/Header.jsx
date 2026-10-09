import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import Logo from "@/components/common/Logo";
import SearchModal from "@/components/layout/SearchModal";
import { NAV_LINKS } from "@/constants/navigation";
import useToggle from "@/hooks/useToggle";
import { selectCartCount } from "@/redux/cartSlice";

const iconButtonClass =
  "relative grid h-10 w-10 place-content-center rounded-full transition-colors hover:bg-white/10 hover:text-primary";

const Header = () => {
  const router = useRouter();
  const cartCount = useSelector(selectCartCount);
  const [isMenuOpen, menu] = useToggle(false);
  const [isSearchOpen, search] = useToggle(false);

  useEffect(() => {
    router.events.on("routeChangeStart", menu.close);
    return () => router.events.off("routeChangeStart", menu.close);
  }, [router.events, menu.close]);

  const linkClass = (href) =>
    `font-medium transition-colors hover:text-primary ${
      router.pathname === href ? "text-primary" : "text-white/80"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-secondary text-white">
      <div className="container flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`rounded-full px-3.5 py-2 text-sm ${linkClass(href)}`}
                  aria-current={router.pathname === href ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Search the menu"
            className={iconButtonClass}
            onClick={search.open}
          >
            <FiSearch size={19} aria-hidden="true" />
          </button>
          <Link href="/auth/login" aria-label="Account" className={iconButtonClass}>
            <FiUser size={19} aria-hidden="true" />
          </Link>
          <Link
            href="/cart"
            aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            className={iconButtonClass}
          >
            <FiShoppingBag size={19} aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-content-center rounded-full bg-primary px-1 text-[11px] font-bold text-secondary">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/menu" className="btn btn-primary ml-2 hidden lg:inline-flex">
            Order online
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            className={`${iconButtonClass} md:hidden`}
            onClick={menu.toggle}
          >
            {isMenuOpen ? <FiX size={21} aria-hidden="true" /> : <FiMenu size={21} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 md:hidden">
          <ul className="container flex flex-col py-3">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block py-3 ${linkClass(href)}`}
                  aria-current={router.pathname === href ? "page" : undefined}
                  onClick={menu.close}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {isSearchOpen && <SearchModal onClose={search.close} />}
    </header>
  );
};

export default Header;
