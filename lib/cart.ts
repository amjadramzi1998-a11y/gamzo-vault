export type CartItem = {
  id: number;
  name: string;
  image: string;
  category: string;
};

export function addToCart(item: CartItem) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const exists = cart.find(
    (product: CartItem) => product.id === item.id
  );

  if (!exists) {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));
}

export function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function removeFromCart(id: number) {
  const cart = getCart();

  const newCart = cart.filter(
    (item: CartItem) => item.id !== id
  );

  localStorage.setItem("cart", JSON.stringify(newCart));

  window.dispatchEvent(new Event("cartUpdated"));
}

export function clearCart() {
  localStorage.removeItem("cart");

  window.dispatchEvent(new Event("cartUpdated"));
}