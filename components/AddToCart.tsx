'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart, type CartItem } from './CartProvider';

export function AddToCart({ product }: { product: Omit<CartItem, 'quantity'> }) {
  const { add, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.find((i) => i.productId === product.productId)?.quantity ?? 0;
  const soldOut = product.stock <= 0;
  const maxed = inCart >= product.stock;

  return (
    <div className="mt-8">
      <button
        className="button-fill disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={soldOut || maxed}
        onClick={() => {
          add(product);
          setAdded(true);
        }}
      >
        {soldOut ? 'Ausverkauft' : maxed ? 'Maximale Menge im Warenkorb' : 'In den Warenkorb'}
      </button>
      <p role="status" aria-live="polite" className="text-[13px] mt-3 min-h-5">
        {added && (
          <>
            Zum Warenkorb hinzugefügt. <Link href="/cart" className="underline text-sageDeep">Warenkorb ansehen →</Link>
          </>
        )}
      </p>
    </div>
  );
}
