import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { seedProducts, type Product } from "@/data/products";

const PRODUCTS_KEY = "qtc.products.v1";
const CART_KEY = "qtc.cart.v1";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

/* ------------------------------- products ------------------------------- */

interface ProductsContextValue {
  products: Product[];
  ready: boolean;
  getProduct: (id: string) => Product | undefined;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProducts: () => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProducts(read<Product[]>(PRODUCTS_KEY, seedProducts));
    setReady(true);
  }, []);

  const persist = useCallback((next: Product[]) => {
    setProducts(next);
    write(PRODUCTS_KEY, next);
  }, []);

  const value = useMemo<ProductsContextValue>(
    () => ({
      products,
      ready,
      getProduct: (id) => products.find((p) => p.id === id),
      addProduct: (product) => persist([product, ...products]),
      updateProduct: (id, patch) =>
        persist(products.map((p) => (p.id === id ? { ...p, ...patch } : p))),
      deleteProduct: (id) => persist(products.filter((p) => p.id !== id)),
      resetProducts: () => persist(seedProducts),
    }),
    [products, ready, persist],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
}

/* --------------------------------- cart --------------------------------- */

export interface CartLine {
  id: string;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    setLines(read<CartLine[]>(CART_KEY, []));
  }, []);

  const persist = useCallback((next: CartLine[]) => {
    setLines(next);
    write(CART_KEY, next);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      add: (id, qty = 1) => {
        const existing = lines.find((l) => l.id === id);
        persist(
          existing
            ? lines.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
            : [...lines, { id, qty }],
        );
      },
      setQty: (id, qty) =>
        persist(
          qty <= 0 ? lines.filter((l) => l.id !== id) : lines.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
      remove: (id) => persist(lines.filter((l) => l.id !== id)),
      clear: () => persist([]),
    }),
    [lines, persist],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
