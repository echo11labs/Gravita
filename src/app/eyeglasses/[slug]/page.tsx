import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FIXTURE_PRODUCTS } from "../fixtures";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const collectionSearchParams = await searchParams;
  
  const product = FIXTURE_PRODUCTS.find((p) => p.slug === slug);
  
  if (!product) {
    notFound();
  }

  // Keep the collection context intact when returning from a frame.
  const collectionQuery = new URLSearchParams();
  for (const key of ["shape", "color", "sort"]) {
    const value = collectionSearchParams[key];
    if (typeof value === "string") collectionQuery.set(key, value);
  }
  const queryString = collectionQuery.toString();
  const backHref = queryString ? `/eyeglasses?${queryString}` : "/eyeglasses";
  const similarShapesQuery = new URLSearchParams();
  similarShapesQuery.set("shape", product.shape);
  const selectedSort = collectionSearchParams.sort;
  if (typeof selectedSort === "string") {
    similarShapesQuery.set("sort", selectedSort);
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-12 max-w-[1440px] mx-auto">
      <div className="mb-8 flex items-center justify-between border-b border-foreground/15 pb-5 lg:mb-10">
        <Link 
          href={backHref}
          className="inline-flex items-center text-sm font-sans tracking-wide text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
          <span className="underline underline-offset-4 decoration-transparent hover:decoration-foreground/30 transition-colors">
            Back to eyeglasses
          </span>
        </Link>
        <span className="text-xs font-sans tracking-[0.16em] uppercase text-foreground/45">Optical study</span>
      </div>

      <div className="grid grid-cols-1 border border-foreground/15 lg:grid-cols-[1.12fr_0.88fr]">
        {/* Product Image Column */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#DEDCD3] lg:aspect-auto lg:min-h-[680px]">
          <Image 
            src={product.image}
            alt={`${product.name} optical frame in ${product.shape} shape, color ${product.color}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center mix-blend-multiply"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-background/90 px-5 py-4 backdrop-blur-sm">
            <span className="text-xs font-sans tracking-[0.16em] uppercase text-foreground/55">{product.shape.replace("-", " ")}</span>
            <span className="text-xs font-sans tracking-[0.12em] uppercase text-foreground/55">{product.color}</span>
          </div>
        </div>

        {/* Product Details Column */}
        <div className="flex flex-col justify-center bg-[#F8F6F1] p-7 sm:p-10 lg:p-14 xl:p-20">
          <div className="mb-8 border-b border-foreground/15 pb-8">
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-foreground/50 mb-4 block">
              Eyeglasses
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-[-0.04em] leading-[0.96] mb-5 text-foreground">
              {product.name}
            </h1>
            <p className="font-sans text-xl text-foreground/80 capitalize">
              {product.shape.replace("-", " ")} optical frame
            </p>
            {product.color && (
              <p className="font-sans text-lg text-foreground/60 mt-2">
                {product.color}
              </p>
            )}
          </div>
          
          <div className="mb-12 border-l-2 border-accent pl-5">
            <h2 className="text-sm font-sans tracking-[0.14em] uppercase text-foreground/50 mb-3">
              A considered contour
            </h2>
            <p className="font-sans text-lg leading-relaxed text-foreground/80 max-w-lg">
              A {product.shape.replace("-", " ")} optical frame.{product.color ? ` ${product.color} finish.` : ""}
            </p>
          </div>
          
          <div className="flex flex-col gap-3 mt-4">
            <Link 
              href="/eyeglasses"
              className="inline-flex items-center justify-between bg-foreground text-background px-6 py-4 text-sm font-medium tracking-wide hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            >
              Browse all eyeglasses <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            
            <Link 
              href={`/eyeglasses?${similarShapesQuery.toString()}`}
              className="inline-flex items-center justify-between border border-foreground/20 px-6 py-4 text-sm font-medium tracking-wide hover:border-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            >
              Explore similar shapes <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
