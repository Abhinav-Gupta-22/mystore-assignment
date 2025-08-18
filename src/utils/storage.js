// Utility functions for localStorage operations

export const getRecentlyViewed = () => {
  if (typeof window === 'undefined') return [];
  const items = localStorage.getItem('recentlyViewed');
  return items ? JSON.parse(items) : [];
};

export const addToRecentlyViewed = (product) => {
  if (typeof window === 'undefined') return;
  
  const items = getRecentlyViewed();
  
  // Remove if product already exists
  const filteredItems = items.filter(item => item.id !== product.id);
  
  // Add to beginning of array
  const updatedItems = [product, ...filteredItems].slice(0, 3); // Keep only 3 most recent
  
  localStorage.setItem('recentlyViewed', JSON.stringify(updatedItems));
  return updatedItems;
};

// Cart related functions
export const getCart = () => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(cart));
};
