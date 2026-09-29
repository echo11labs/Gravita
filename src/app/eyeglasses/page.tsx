"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { FIXTURE_PRODUCTS } from "./fixtures";
import { useFocusTrap } from "../useFocusTrap";

const SHAPES = ["all", "rectangular", "round", "cat-eye", "aviator"] as const;
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "name-asc", label: "Name: A–Z" },
  { value: "name-desc", label: "Name: Z–A" },
] as const;
const COLORS = [...new Set(FIXTURE_PRODUCTS.map((product) => product.color))];

type Shape = (typeof SHAPES)[number];
type SortOption = (typeof SORT_OPTIONS)[number]["value"];
type Color = (typeof COLORS)[number] | "all";

const displayShape = (shape: Shape) =>
  shape === "all"
    ? "All shapes"
    : shape.charAt(0).toUpperCase() + shape.slice(1).replace("-", " ");

const resultLabel = (count: number) =>
  `${count} frame${count === 1 ? "" : "s"}`;

function EyeglassesCollection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requestedShape = searchParams.get("shape")?.toLowerCase();
  const requestedColor = searchParams.get("color");
  const requestedSort = searchParams.get("sort");
  const currentShape: Shape = SHAPES.includes(requestedShape as Shape)
    ? (requestedShape as Shape)
    : "all";
  const currentColor: Color = COLORS.includes(requestedColor ?? "")
    ? (requestedColor as Color)
    : "all";
  const currentSort: SortOption = SORT_OPTIONS.some(
    (option) => option.value === requestedSort
  )
    ? (requestedSort as SortOption)
    : "featured";

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [pendingMobileShape, setPendingMobileShape] =
    useState<Shape>(currentShape);
  const [pendingMobileColor, setPendingMobileColor] =
    useState<Color>(currentColor);
  const [pendingMobileSort, setPendingMobileSort] =
    useState<SortOption>(currentSort);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(true);
  const [isMobileShapeOpen, setIsMobileShapeOpen] = useState(true);
  const [isMobileColorOpen, setIsMobileColorOpen] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const getFilteredProducts = (shape: Shape, color: Color) =>
    FIXTURE_PRODUCTS.filter(
      (product) =>
        (shape === "all" || product.shape === shape) &&
        (color === "all" || product.color === color)
    );

  const sortProducts = (
    products: typeof FIXTURE_PRODUCTS,
    sort: SortOption
  ) => {
    if (sort === "featured") return products;

    return [...products].sort((first, second) => {
      const comparison = first.name.localeCompare(second.name);
      return sort === "name-asc" ? comparison : -comparison;
    });
  };

  const filteredProducts = sortProducts(
    getFilteredProducts(currentShape, currentColor),
    currentSort
  );
  const pendingFilteredProducts = getFilteredProducts(
    pendingMobileShape,
    pendingMobileColor
  );
  const hasActiveFilters =
    currentShape !== "all" ||
    currentColor !== "all" ||
    currentSort !== "featured";

  const updateFilters = ({
    shape = currentShape,
    color = currentColor,
    sort = currentSort,
  }: {
    shape?: Shape;
    color?: Color;
    sort?: SortOption;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (shape === "all") params.delete("shape");
    else params.set("shape", shape);

    if (color === "all") params.delete("color");
    else params.set("color", color);

    if (sort === "featured") params.delete("sort");
    else params.set("sort", sort);

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const resetMobileFilters = () => {
    setPendingMobileShape("all");
    setPendingMobileColor("all");
    setPendingMobileSort("featured");
  };

  const closeMobileFilter = () => {
    setIsMobileFilterOpen(false);
    openButtonRef.current?.focus();
  };

  const applyMobileFilters = () => {
    updateFilters({
      shape: pendingMobileShape,
      color: pendingMobileColor,
      sort: pendingMobileSort,
    });
    closeMobileFilter();
  };

  const openMobileFilters = () => {
    setPendingMobileShape(currentShape);
    setPendingMobileColor(currentColor);
    setPendingMobileSort(currentSort);
    setIsMobileFilterOpen(true);
  };

  useFocusTrap(isMobileFilterOpen, mobileDrawerRef);

  useEffect(() => {
    if (!isMobileFilterOpen) return;

    const closeButton = mobileDrawerRef.current?.querySelector("button");
    closeButton?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileFilter();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileFilterOpen]);

  const collectionQuery = new URLSearchParams();
  if (currentShape !== "all") collectionQuery.set("shape", currentShape);
  if (currentColor !== "all") collectionQuery.set("color", currentColor);
  if (currentSort !== "featured") collectionQuery.set("sort", currentSort);
  const collectionQueryString = collectionQuery.toString();

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-28">
      <header data-motion-section className="relative overflow-hidden pb-10 pt-14 sm:pb-14 sm:pt-20 lg:pb-20 lg:pt-28">
        <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 font-sans text-xs uppercase tracking-[0.18em] text-foreground/50">
              Eyeglasses · the optical edit
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-[0.94] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-8xl">
              Six frames,
              <br />
              a clearer start.
            </h1>
          </div>
          <div className="max-w-sm border-l border-foreground/20 pb-1 pl-5 lg:col-span-4 lg:ml-auto">
            <p className="font-sans text-lg leading-relaxed text-foreground/75">
              A small optical collection built around shape, proportion, and
              the way a frame lives with you.
            </p>
          </div>
        </div>
      </header>

      <div className="mb-8 flex items-center justify-between border-y border-foreground/10 py-3 lg:hidden">
        <span className="font-sans text-sm font-medium tracking-wide text-foreground/70">
          {resultLabel(filteredProducts.length)}
        </span>
        <button
          ref={openButtonRef}
          onClick={openMobileFilters}
          className="flex h-11 items-center font-sans text-sm font-medium transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          aria-expanded={isMobileFilterOpen}
          aria-haspopup="dialog"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" aria-hidden="true" />
          Filters
          {hasActiveFilters && (
            <span
              className="ml-2 h-2 w-2 rounded-full bg-foreground"
              aria-label="Filters active"
            />
          )}
        </button>
      </div>

      <div className="hidden grid-cols-[14rem_minmax(0,1fr)] gap-16 border-y border-foreground/15 py-5 lg:grid">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-sm uppercase tracking-widest text-foreground/70">
            Filters
          </h2>
          {hasActiveFilters && (
            <button
              onClick={() =>
                updateFilters({ shape: "all", color: "all", sort: "featured" })
              }
              className="font-sans text-xs font-medium uppercase tracking-widest text-foreground/55 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4"
            >
              Reset
            </button>
          )}
        </div>
        <span className="font-sans text-sm uppercase tracking-widest text-foreground/50">
          {resultLabel(filteredProducts.length)}
        </span>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 lg:pt-10">
        <aside className="hidden w-56 shrink-0 lg:block" aria-label="Filters">
          <div className="sticky top-32 space-y-8">
            <section className="border-b border-foreground/15 pb-7">
              <h3 className="mb-4 font-sans text-sm font-semibold text-foreground">
                Sort by
              </h3>
              <div className="space-y-3" role="radiogroup" aria-label="Sort frames">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    role="radio"
                    aria-checked={currentSort === option.value}
                    onClick={() => updateFilters({ sort: option.value })}
                    className="flex min-h-8 w-full items-center gap-3 text-left font-sans text-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${currentSort === option.value ? "border-foreground bg-foreground" : "border-foreground/45"}`}
                      aria-hidden="true"
                    >
                      {currentSort === option.value && (
                        <span className="h-1.5 w-1.5 rounded-full bg-background" />
                      )}
                    </span>
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="border-b border-foreground/15 pb-7">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-sans text-sm font-semibold text-foreground">
                  Frame shape
                </h3>
                {currentShape !== "all" && (
                  <span className="font-sans text-xs text-foreground/45">
                    {displayShape(currentShape)}
                  </span>
                )}
              </div>
              <div className="space-y-3" role="radiogroup" aria-label="Frame shape">
                {SHAPES.map((shape) => {
                  const count = getFilteredProducts(shape, currentColor).length;
                  return (
                    <button
                      key={shape}
                      role="radio"
                      aria-checked={currentShape === shape}
                      onClick={() => updateFilters({ shape })}
                      className="flex min-h-8 w-full items-center justify-between text-left font-sans text-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border ${currentShape === shape ? "border-foreground bg-foreground" : "border-foreground/45"}`}
                          aria-hidden="true"
                        >
                          {currentShape === shape && (
                            <span className="h-1.5 w-1.5 rounded-full bg-background" />
                          )}
                        </span>
                        {displayShape(shape)}
                      </span>
                      <span className="text-xs tabular-nums text-foreground/45">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-sans text-sm font-semibold text-foreground">
                  Colour
                </h3>
                {currentColor !== "all" && (
                  <span className="max-w-28 truncate font-sans text-xs text-foreground/45">
                    {currentColor}
                  </span>
                )}
              </div>
              <div className="space-y-3" role="radiogroup" aria-label="Frame colour">
                <button
                  role="radio"
                  aria-checked={currentColor === "all"}
                  onClick={() => updateFilters({ color: "all" })}
                  className="flex min-h-8 w-full items-center gap-3 text-left font-sans text-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${currentColor === "all" ? "border-foreground bg-foreground" : "border-foreground/45"}`}
                    aria-hidden="true"
                  >
                    {currentColor === "all" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-background" />
                    )}
                  </span>
                  All colours
                </button>
                {COLORS.map((color) => (
                  <button
                    key={color}
                    role="radio"
                    aria-checked={currentColor === color}
                    onClick={() => updateFilters({ color })}
                    className="flex min-h-8 w-full items-center gap-3 text-left font-sans text-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${currentColor === color ? "border-foreground bg-foreground" : "border-foreground/45"}`}
                      aria-hidden="true"
                    >
                      {currentColor === color && (
                        <span className="h-1.5 w-1.5 rounded-full bg-background" />
                      )}
                    </span>
                    <span className="truncate">{color}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {filteredProducts.length === 0 ? (
            <div className="border border-dashed border-foreground/20 bg-muted/10 py-24 text-center">
              <p className="mb-6 font-sans text-lg text-foreground/70">
                No frames match these filters.
              </p>
              <button
                onClick={() =>
                  updateFilters({ shape: "all", color: "all", sort: "featured" })
                }
                className="inline-flex h-11 items-center border-b border-foreground pb-1 font-sans text-sm font-medium tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 content-start items-start gap-x-4 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/eyeglasses/${product.slug}${collectionQueryString ? `?${collectionQueryString}` : ""}`}
                  className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <div data-motion-media className="relative mb-6 aspect-square w-full overflow-hidden bg-muted/20">
                    <Image
                      src={product.image}
                      alt={`${product.name} optical frame in ${product.shape} shape`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 motion-safe:group-hover:scale-[1.02]"
                    />
                  </div>
                  <h3 className="mb-1 font-sans text-lg font-medium tracking-wide text-foreground">
                    {product.name}
                  </h3>
                  <p className="mb-4 flex items-center font-sans text-sm text-foreground/60">
                    <span>{product.color}</span>
                    <span className="mx-1.5 opacity-50">|</span>
                    <span className="capitalize">
                      {product.shape.replace("-", " ")}
                    </span>
                  </p>
                  <div className="mt-auto inline-flex items-center font-sans text-sm font-medium text-foreground/80">
                    <span className="underline decoration-foreground/30 underline-offset-4 transition-colors group-hover:decoration-foreground">
                      View frame
                    </span>
                    <ArrowRight
                      className="ml-1.5 h-3 w-3 transition-transform motion-safe:group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <div
            className="fixed inset-0 bg-foreground/25 backdrop-blur-sm"
            onClick={closeMobileFilter}
            aria-hidden="true"
          />
          <div
            ref={mobileDrawerRef}
            className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[1.5rem] border-t border-foreground/10 bg-background shadow-2xl"
          >
            <div className="relative flex h-17 shrink-0 items-center justify-between border-b border-foreground/10 px-4">
              <button
                onClick={closeMobileFilter}
                className="flex h-11 w-11 items-center justify-center text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <h3 className="absolute left-1/2 -translate-x-1/2 font-sans text-base font-semibold">
                Filters
              </h3>
              <button
                onClick={resetMobileFilters}
                className="flex h-11 items-center px-2 font-sans text-sm font-medium transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                Reset
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5">
              <section className="border-b border-foreground/10">
                <button
                  onClick={() => setIsMobileSortOpen((open) => !open)}
                  className="flex min-h-16 w-full items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  aria-expanded={isMobileSortOpen}
                >
                  <span className="font-sans text-base font-semibold">Sort by</span>
                  {isMobileSortOpen ? (
                    <ChevronUp className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
                {isMobileSortOpen && (
                  <div className="space-y-1 pb-5" role="radiogroup" aria-label="Sort frames">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        role="radio"
                        aria-checked={pendingMobileSort === option.value}
                        onClick={() => setPendingMobileSort(option.value)}
                        className="flex min-h-13 w-full items-center justify-between rounded-lg px-1 text-left font-sans text-base text-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                      >
                        {option.label}
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${pendingMobileSort === option.value ? "border-foreground bg-foreground" : "border-foreground/45"}`}
                          aria-hidden="true"
                        >
                          {pendingMobileSort === option.value && (
                            <span className="h-2 w-2 rounded-full bg-background" />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </section>

              <section className="border-b border-foreground/10">
                <button
                  onClick={() => setIsMobileShapeOpen((open) => !open)}
                  className="flex min-h-16 w-full items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  aria-expanded={isMobileShapeOpen}
                >
                  <span>
                    <span className="block font-sans text-base font-semibold">Frame shape</span>
                    {!isMobileShapeOpen && pendingMobileShape !== "all" && (
                      <span className="mt-0.5 block font-sans text-sm text-foreground/55">
                        {displayShape(pendingMobileShape)}
                      </span>
                    )}
                  </span>
                  {isMobileShapeOpen ? (
                    <ChevronUp className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
                {isMobileShapeOpen && (
                  <div className="space-y-1 pb-5" role="radiogroup" aria-label="Frame shape">
                    {SHAPES.map((shape) => (
                      <button
                        key={shape}
                        role="radio"
                        aria-checked={pendingMobileShape === shape}
                        onClick={() => setPendingMobileShape(shape)}
                        className="flex min-h-13 w-full items-center justify-between rounded-lg px-1 text-left font-sans text-base text-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                      >
                        {displayShape(shape)}
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${pendingMobileShape === shape ? "border-foreground bg-foreground" : "border-foreground/45"}`}
                          aria-hidden="true"
                        >
                          {pendingMobileShape === shape && (
                            <span className="h-2 w-2 rounded-full bg-background" />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </section>

              <section className="border-b border-foreground/10">
                <button
                  onClick={() => setIsMobileColorOpen((open) => !open)}
                  className="flex min-h-16 w-full items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  aria-expanded={isMobileColorOpen}
                >
                  <span>
                    <span className="block font-sans text-base font-semibold">Colour</span>
                    {!isMobileColorOpen && pendingMobileColor !== "all" && (
                      <span className="mt-0.5 block font-sans text-sm text-foreground/55">
                        {pendingMobileColor}
                      </span>
                    )}
                  </span>
                  {isMobileColorOpen ? (
                    <ChevronUp className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
                {isMobileColorOpen && (
                  <div className="space-y-1 pb-5" role="radiogroup" aria-label="Frame colour">
                    {(["all", ...COLORS] as Color[]).map((color) => (
                      <button
                        key={color}
                        role="radio"
                        aria-checked={pendingMobileColor === color}
                        onClick={() => setPendingMobileColor(color)}
                        className="flex min-h-13 w-full items-center justify-between rounded-lg px-1 text-left font-sans text-base text-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                      >
                        {color === "all" ? "All colours" : color}
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${pendingMobileColor === color ? "border-foreground bg-foreground" : "border-foreground/45"}`}
                          aria-hidden="true"
                        >
                          {pendingMobileColor === color && (
                            <span className="h-2 w-2 rounded-full bg-background" />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <div className="shrink-0 border-t border-foreground/10 bg-background p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button
                onClick={applyMobileFilters}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground font-sans text-base font-medium text-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
              >
                Show {resultLabel(pendingFilteredProducts.length)}
                <Check className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EyeglassesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="min-h-screen bg-background px-8 pt-32">
            <div className="mb-8 h-12 w-48 animate-pulse bg-muted" />
            <div className="h-4 w-96 animate-pulse bg-muted" />
          </div>
        }
      >
        <EyeglassesCollection />
      </Suspense>
    </div>
  );
}
