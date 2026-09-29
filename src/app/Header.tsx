"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Menu, X, ArrowRight } from "lucide-react";
import { FIXTURE_PRODUCTS } from "./eyeglasses/fixtures";
import { useFocusTrap } from "./useFocusTrap";

const NAV_ITEMS = [
  { href: "/eyeglasses", label: "Eyeglasses" },
  { href: "/sunglasses", label: "Sunglasses" },
  { href: "/find-your-frame", label: "Find your frame" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const searchDialogRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const cartFirstFocusableRef = useRef<HTMLButtonElement>(null);
  const cartTriggerRef = useRef<HTMLButtonElement>(null);
  const cartDialogRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  const router = useRouter();

  // Derived Search Results
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    
    return FIXTURE_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.shape.toLowerCase().includes(query) ||
      product.color.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Focus management for search overlay
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Focus management for cart drawer
  useEffect(() => {
    if (isCartOpen && cartFirstFocusableRef.current) {
      cartFirstFocusableRef.current.focus();
    }
  }, [isCartOpen]);

  useFocusTrap(isSearchOpen, searchDialogRef);
  useFocusTrap(isCartOpen, cartDialogRef);
  useFocusTrap(isMobileMenuOpen, mobileMenuRef);

  const closeSearch = () => {
    setIsSearchOpen(false);
    // Return focus to trigger after the DOM updates
    setTimeout(() => {
      searchTriggerRef.current?.focus();
    }, 0);
  };

  const openCart = () => {
    setIsCartOpen(true);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
    // Return focus to trigger after the DOM updates
    setTimeout(() => {
      cartTriggerRef.current?.focus();
    }, 0);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      menuTriggerRef.current?.focus();
    }, 0);
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    setIsSearchOpen(false);
    setIsCartOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      const closeButton = mobileMenuRef.current?.querySelector<HTMLButtonElement>("button");
      closeButton?.focus();
    }
  }, [isMobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSearchOpen) closeSearch();
        if (isCartOpen) closeCart();
        if (isMobileMenuOpen) closeMobileMenu();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, isCartOpen, isMobileMenuOpen]);

  // Lock body scroll when overlays are open
  useEffect(() => {
    if (isSearchOpen || isCartOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen, isCartOpen, isMobileMenuOpen]);

  // Handle open search
  const openSearch = () => {
    setIsSearchOpen(true);
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
    setSearchQuery("");
  };

  // Handle enter key in search
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      const firstResult = searchResults[0];
      router.push(`/eyeglasses/${firstResult.slug}`);
      closeSearch();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 h-16 w-full border-b border-foreground/10 bg-background/95 backdrop-blur-md sm:h-[4.75rem]">
        <div className="mx-auto h-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center">
            <div className="flex items-center lg:hidden">
              <button
                ref={menuTriggerRef}
                type="button"
                className="flex h-11 w-11 -ml-2 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.05] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            <nav className="hidden h-full items-center gap-1 lg:flex" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative flex h-full items-center px-3 font-sans text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-inset ${isActive ? "text-foreground after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:bg-foreground" : "text-foreground/65 hover:text-foreground"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-center">
              <Link href="/" className="flex items-center justify-center px-2 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground" aria-label="Gravita Home">
                <span className="mt-0.5 font-logo text-2xl font-light leading-none tracking-[0.1em] sm:text-[2rem]">
                  GRΛVITΛ
                </span>
              </Link>
            </div>

            <div className="flex items-center justify-end gap-1 sm:gap-2">
              <button
                ref={searchTriggerRef}
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.05] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                aria-label="Search"
                aria-expanded={isSearchOpen}
                onClick={openSearch}
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                ref={cartTriggerRef}
                type="button"
                className="flex h-11 w-11 -mr-2 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.05] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                aria-label="Open shopping bag drawer"
                aria-expanded={isCartOpen}
                onClick={openCart}
              >
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

      </header>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="fixed inset-0 z-[90] flex min-h-[100dvh] flex-col bg-background lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="grid h-16 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-foreground/10 px-4">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.05] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="px-2 py-1 font-logo text-2xl font-light tracking-[0.1em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              aria-label="Gravita Home"
            >
              GRΛVITΛ
            </Link>
            <span aria-hidden="true" />
          </div>

          <nav className="flex flex-1 flex-col px-6 pt-6" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeMobileMenu}
                  className={`group flex items-center justify-between border-b border-foreground/10 py-5 font-display text-[2rem] leading-none tracking-[-0.03em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground"}`}
                >
                  {item.label}
                  <ArrowRight className="h-5 w-5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" aria-hidden="true" />
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-foreground/10 px-6 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={openSearch}
              className="flex h-11 items-center font-sans text-sm font-medium text-foreground/75 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <Search className="mr-3 h-4 w-4" aria-hidden="true" />
              Search frames
            </button>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div 
          ref={searchDialogRef}
          className="fixed inset-0 z-[100] flex flex-col w-screen h-[100dvh] bg-background overflow-hidden" 
          role="dialog" 
          aria-modal="true" 
          aria-label="Search"
        >
          <div className="flex justify-between items-center h-20 pt-[env(safe-area-inset-top)] px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full border-b border-foreground/10 shrink-0 box-content">
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-[10px] font-sans tracking-widest uppercase text-foreground/50 mb-1">
                SEARCH
              </span>
              <div className="flex items-center">
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search frames, shapes, or colors"
                  className="w-full bg-transparent border-none text-xl sm:text-2xl font-display focus:outline-none placeholder:text-foreground/30 text-foreground"
                  aria-label="Search query"
                />
              </div>
            </div>
            <button
              type="button"
              className="ml-4 p-3 text-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground transition-colors"
              onClick={closeSearch}
              aria-label="Close search"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto w-full overscroll-contain pb-[env(safe-area-inset-bottom)]">
            <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <div aria-live="polite" className="sr-only">
                {searchQuery.trim().length > 0 ? `${searchResults.length} results found.` : ""}
              </div>
              
              {searchQuery.trim().length === 0 ? (
                <div className="flex flex-col">
                  <p className="font-sans text-lg text-foreground/60 mb-8">Try a frame name, shape, or color.</p>
                  <Link 
                    href="/eyeglasses" 
                    onClick={closeSearch}
                    className="inline-flex items-center text-sm font-sans tracking-wide text-foreground/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 transition-colors self-start rounded-sm"
                  >
                    <span className="underline underline-offset-4 decoration-transparent hover:decoration-foreground/30 transition-colors">
                      Browse eyeglasses
                    </span>
                    <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                  </Link>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="flex flex-col">
                  <p className="text-xs font-sans tracking-widest uppercase text-foreground/50 mb-6 block">
                    {searchResults.length} Result{searchResults.length !== 1 && 's'}
                  </p>
                  <ul className="grid grid-cols-1 gap-4 sm:gap-6">
                    {searchResults.map((product) => (
                      <li key={product.slug}>
                        <Link 
                          href={`/eyeglasses/${product.slug}`}
                          onClick={closeSearch}
                          className="group flex items-center justify-between p-4 -mx-4 hover:bg-foreground/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:bg-foreground/[0.03] rounded-sm"
                        >
                          <div className="flex items-center space-x-6">
                            <div className="relative h-16 w-16 bg-muted/20 shrink-0 overflow-hidden">
                              <Image 
                                src={product.image}
                                alt=""
                                fill
                                sizes="64px"
                                className="object-cover object-center"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-display text-2xl text-foreground group-hover:text-foreground/80 transition-colors">
                                {product.name}
                              </span>
                              <span className="font-sans text-sm text-foreground/60 capitalize">
                                {product.color} • {product.shape.replace("-", " ")}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-foreground/30 group-hover:text-foreground transition-colors" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col">
                  <p className="font-display text-2xl text-foreground mb-8">
                    No frames match &ldquo;{searchQuery}&rdquo;.
                  </p>
                  <Link 
                    href="/eyeglasses" 
                    onClick={closeSearch}
                    className="inline-flex items-center text-sm font-sans tracking-wide text-foreground/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 transition-colors self-start rounded-sm"
                  >
                    <span className="underline underline-offset-4 decoration-transparent hover:decoration-foreground/30 transition-colors">
                      Browse all eyeglasses
                    </span>
                    <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <>
          <div 
            className="fixed inset-0 z-[90] bg-foreground/20 backdrop-blur-sm transition-opacity"
            onClick={closeCart}
            aria-hidden="true"
          />
          <div 
            ref={cartDialogRef}
            className="fixed inset-y-0 right-0 z-[100] w-full max-w-md bg-background shadow-2xl flex flex-col transform transition-transform border-l border-foreground/10"
            role="dialog" 
            aria-modal="true" 
            aria-label="Your bag"
          >
            <div className="flex justify-between items-center h-20 px-6 pt-[env(safe-area-inset-top)] border-b border-foreground/10 shrink-0 box-content">
              <h2 className="text-lg font-display tracking-wide uppercase text-foreground">Your bag</h2>
              <button
                ref={cartFirstFocusableRef}
                type="button"
                className="p-3 -mr-3 text-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground transition-colors"
                onClick={closeCart}
                aria-label="Close bag"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 pb-[env(safe-area-inset-bottom)]">
              <p className="text-2xl font-display text-foreground">Your bag is empty.</p>
              <p className="font-sans text-lg text-foreground/60 mb-8">Explore frames and find a place to start.</p>
              <Link
                href="/eyeglasses"
                onClick={closeCart}
                className="inline-flex items-center text-sm font-sans tracking-wide text-foreground/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 transition-colors rounded-sm"
              >
                <span className="underline underline-offset-4 decoration-transparent hover:decoration-foreground/30 transition-colors">
                  Explore eyeglasses
                </span>
                <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
