// Sample product data
export const products = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    description: 'A comfortable and stylish white t-shirt for everyday wear.',
    price: 19.99,
    image: '/images/white-tshirt.jpg',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Clothing'
  },
  {
    id: 2,
    name: 'Blue Jeans',
    description: 'Classic blue denim jeans with a comfortable fit.',
    price: 49.99,
    image: '/images/blue-jeans.jpg',
    colors: ['Blue', 'Black', 'Gray'],
    sizes: ['28', '30', '32', '34', '36'],
    category: 'Clothing'
  },
  {
    id: 3,
    name: 'Running Shoes',
    description: 'High-performance running shoes for athletes.',
    price: 89.99,
    image: '/images/running-shoes.jpg',
    colors: ['Black', 'White', 'Red', 'Blue'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    category: 'Footwear'
  },
  {
    id: 4,
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation.',
    price: 149.99,
    image: '/images/headphones.jpg',
    colors: ['Black', 'White', 'Blue'],
    category: 'Electronics'
  },
  {
    id: 5,
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking.',
    price: 199.99,
    image: '/images/smart-watch.jpg',
    colors: ['Black', 'Silver', 'Gold'],
    category: 'Electronics'
  },
  {
    id: 6,
    name: 'Backpack',
    description: 'Durable backpack with multiple compartments.',
    price: 39.99,
    image: '/images/backpack.jpg',
    colors: ['Black', 'Blue', 'Gray'],
    category: 'Accessories'
  }
];

// Function to fetch a single product by ID
export const fetchProductById = (id) => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const product = products.find(p => p.id === parseInt(id));
      resolve(product || null);
    }, 100);
  });
};

export default products;
