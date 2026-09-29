"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { FIXTURE_PRODUCTS } from "./eyeglasses/fixtures";
import { useFocusTrap } from "./useFocusTrap";

const NAV_ITEMS = [
  { href: "/eyeglasses", label: "Eyeglasses" },
  { href: "/sunglasses", label: "Sunglasses" },
  { href: "/find-your-frame", label: "Guide" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDialogRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  const router = useRouter();

  const isDarkPage = pathname === "/find-your-frame" || pathname === "/sunglasses";
  const isHomePage = pathname === "/";

  // Scroll detection for transparent-to-solid transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useFocusTrap(isSearchOpen, searchDialogRef);
  useFocusTrap(isMobileMenuOpen, mobileMenuRef);

  const closeSearch = () => setIsSearchOpen(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    setIsSearchOpen(false);
  };

  // Lock body scroll when overlays are open
  useEffect(() => {
    if (isSearchOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSearchOpen, isMobileMenuOpen]);

  const openSearch = () => {
    setIsSearchOpen(true);
    setIsMobileMenuOpen(false);
    setSearchQuery("");
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      const firstResult = searchResults[0];
      router.push(`/eyeglasses/${firstResult.slug}`);
      closeSearch();
    }
  };

  const headerClass = `
    fixed top-0 z-40 w-full transition-all duration-500
    ${isScrolled 
      ? (isDarkPage ? "bg-foreground/95 backdrop-blur-md border-b border-background/10 py-4 text-background" : "bg-background/95 backdrop-blur-md border-b border-foreground/10 py-4 text-foreground")
      : `bg-transparent border-b border-transparent py-6 lg:py-8 ${isDarkPage ? "text-background" : (isHomePage ? "text-background lg:text-foreground" : "text-foreground")}`
    }
  `;

  return (
    <>
      <header className={headerClass}>
        <div className="mx-auto flex items-center justify-between px-6 lg:px-12 w-full max-w-[1440px]">
          
          {/* Desktop Left Navigation */}
          <nav className="hidden lg:flex items-center gap-10 w-1/3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const underlineColor = isScrolled 
                ? (isDarkPage ? "bg-background" : "bg-foreground")
                : (isDarkPage ? "bg-background" : (isHomePage ? "bg-foreground lg:bg-foreground" : "bg-foreground"));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs tracking-[0.1em] uppercase font-sans relative group py-1"
                >
                  <span className={`transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
                    {item.label}
                  </span>
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-[1px] transform origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} ${underlineColor}`} 
                  />
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden w-1/3">
            <button
              type="button"
              onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
              className="text-xs tracking-[0.1em] uppercase font-sans group relative py-1"
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                Menu
              </span>
            </button>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center w-1/3">
            <Link href="/" className="font-logo text-3xl sm:text-4xl tracking-[0.15em] font-light leading-none">
              GRΛVITΛ
            </Link>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center justify-end gap-10 w-1/3">
            <button
              onClick={openSearch}
              className="text-xs tracking-[0.1em] uppercase font-sans relative group py-1"
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">Search</span>
              <span className={`absolute bottom-0 left-0 w-full h-[1px] transform origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] scale-x-0 group-hover:scale-x-100 ${isScrolled ? (isDarkPage ? "bg-background" : "bg-foreground") : (isDarkPage ? "bg-background" : (isHomePage ? "bg-foreground lg:bg-foreground" : "bg-foreground"))}`} />
            </button>
          </div>
          
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground lg:hidden animate-in slide-in-from-top-4 fade-in duration-500"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex justify-between items-center h-24 px-6 shrink-0">
            <span className="font-logo text-3xl tracking-[0.15em] font-light">GRΛVITΛ</span>
            <button onClick={closeMobileMenu} className="p-2 -mr-2 text-foreground hover:text-foreground/60 transition-colors">
              <X className="h-8 w-8" strokeWidth={1} />
            </button>
          </div>
          
          {/* Main Links */}
          <nav className="flex flex-col px-6 pt-8 pb-8 overflow-y-auto flex-1 hide-scrollbar">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.href} className="border-b border-foreground/10">
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="group flex flex-col py-6 focus-visible:outline-none"
                  >
                    <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-foreground/40 mb-2">
                      0{index + 1}
                    </span>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-display text-5xl sm:text-6xl tracking-tight text-foreground transition-transform duration-500 group-active:translate-x-2">
                        {item.label}
                      </span>
                      <ArrowRight className="h-6 w-6 text-foreground/20 transition-all duration-500 group-active:text-foreground" strokeWidth={1} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Search Action */}
            <div className="mt-12 flex flex-col pt-4">
               <button onClick={openSearch} className="flex items-center justify-between py-4 border border-foreground/20 px-6 rounded-full text-xs font-sans tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground">
                 <span>Search Collection</span>
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
               </button>
            </div>
          </nav>
          
          {/* Footer Area */}
          <div className="px-6 py-8 mt-auto shrink-0 flex justify-between items-end">
            <div className="flex flex-col gap-3 text-xs font-sans text-foreground/60">
              <span className="hover:text-foreground cursor-pointer transition-colors">Instagram</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Journal</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Contact</span>
            </div>
            <div className="flex flex-col items-end gap-5">
              <div className="text-[9px] font-sans uppercase tracking-[0.2em] text-foreground/40 text-right leading-relaxed">
                © 2026<br/>GRAVITA STUDIO
              </div>
              <div className="flex flex-col items-end gap-1.5 pt-3 border-t border-foreground/10 mt-auto">
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-sans uppercase tracking-[0.2em] text-foreground/40">Developed by</span>
                  <a href="https://echo11.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm">
                    <Image src="/images/echo11.png" alt="Echo11 Labs" width={12} height={12} className="opacity-50 group-hover:opacity-100 transition-opacity rounded-sm" />
                    <span className="text-[10px] font-sans font-semibold tracking-wider text-foreground/50 group-hover:text-foreground transition-colors">
                      echo11.labs
                    </span>
                  </a>
                </div>
                <a href="mailto:echo11.labs@gmail.com" className="text-[9px] font-mono text-foreground/30 hover:text-foreground/70 transition-colors uppercase tracking-[0.15em] mt-0.5">
                  echo11.labs@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div 
          ref={searchDialogRef}
          className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground animate-in slide-in-from-top-4 fade-in duration-500" 
          role="dialog" 
          aria-modal="true" 
        >
          {/* Header Controls */}
          <div className="flex justify-between items-center h-24 px-6 lg:px-12 w-full shrink-0">
            <span className="font-logo text-3xl tracking-[0.15em] font-light">GRΛVITΛ</span>
            <button onClick={closeSearch} className="p-2 -mr-2 text-foreground hover:text-foreground/60 transition-colors focus-visible:outline-none">
              <X className="h-8 w-8" strokeWidth={1} />
            </button>
          </div>

          <div className="flex flex-col flex-1 max-w-[1440px] mx-auto w-full px-6 lg:px-12 pt-8 lg:pt-16 pb-12 overflow-y-auto hide-scrollbar">
            {/* Massive Search Input */}
            <div className="relative border-b border-foreground/20 pb-6 mb-12">
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="What are you looking for?"
                className="w-full bg-transparent border-none text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight focus:outline-none placeholder:text-foreground/20 text-foreground"
              />
            </div>
            
            {searchQuery.trim().length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in duration-700 delay-100 fill-mode-both">
                {/* Popular Searches */}
                <div>
                  <h3 className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-foreground/40 mb-6">Popular Searches</h3>
                  <ul className="flex flex-col gap-5">
                    {["Rectangular Frames", "Round Classics", "Bold Cat-eye", "Titanium Aviators"].map((term) => (
                      <li key={term}>
                        <button 
                          onClick={() => setSearchQuery(term.split(" ")[0].toLowerCase())}
                          className="font-display text-3xl lg:text-4xl text-foreground hover:text-foreground/50 transition-colors text-left focus-visible:outline-none"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Featured Discovery */}
                <div className="hidden sm:block">
                  <h3 className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-foreground/40 mb-6">Featured Discovery</h3>
                  <Link href="/sunglasses" onClick={closeSearch} className="group block relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-muted rounded-none focus-visible:outline-none">
                    <Image src="/images/frame_aviator.jpg" fill alt="Featured Collection" className="object-cover object-center group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]" />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                      <span className="font-display text-3xl sm:text-4xl text-white drop-shadow-md">The Aviator Heritage</span>
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-white/90 mt-2 flex items-center gap-2">
                        Explore Collection <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-12">
                {searchResults.map((product) => (
                  <li key={product.slug} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                    <Link 
                      href={`/eyeglasses/${product.slug}`}
                      onClick={closeSearch}
                      className="group flex flex-col focus-visible:outline-none"
                    >
                      <div className="relative aspect-[4/5] w-full bg-muted mb-4 overflow-hidden">
                        <Image 
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                        />
                        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-700 group-hover:bg-foreground/5" />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                        <div className="flex flex-col">
                          <span className="font-display text-xl sm:text-2xl text-foreground group-hover:text-foreground/70 transition-colors">
                            {product.name}
                          </span>
                          <span className="font-sans text-[10px] sm:text-xs text-foreground/50 capitalize mt-1 tracking-wider">
                            {product.color}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
                <p className="font-display text-4xl text-foreground mb-4">
                  No frames match &ldquo;{searchQuery}&rdquo;.
                </p>
                <p className="font-sans text-sm text-foreground/50">
                  Try adjusting your search terms or explore our popular styles.
                </p>
                <button onClick={() => setSearchQuery("")} className="mt-8 text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-foreground border-b border-foreground/20 pb-1 hover:border-foreground transition-colors focus-visible:outline-none">
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </>
  );
}
