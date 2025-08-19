// Sample product data
export const products = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    description: 'A comfortable and stylish white t-shirt for everyday wear.',
    price: 19.99,
    image: '/images/white-tshirt.jpg',
    variants: [
      {
        color: 'White',
        sizes: ['S', 'M', 'L', 'XL'],
        image: '/images/white-tshirt.jpg'
      },
      {
        color: 'Black',
        sizes: ['S', 'M', 'L', 'XL'],
        image: '/images/black-tshirt.jpg'
      },
      {
        color: 'Gray',
        sizes: ['S', 'M', 'L'],
        image: '/images/gray-tshirt.jpg'
      }
    ],
    category: 'Clothing'
  },
  {
    id: 2,
    name: 'Blue Jeans',
    description: 'Classic blue denim jeans with a comfortable fit.',
    price: 49.99,
    image: '/images/blue-jeans.jpg',
    variants: [
      {
        color: 'Blue',
        sizes: ['28', '30', '32', '34', '36'],
        image: '/images/blue-jeans.jpg'
      },
      {
        color: 'Black',
        sizes: ['28', '30', '32', '34'],
        image: '/images/black-jeans.jpg'
      },
      {
        color: 'Gray',
        sizes: ['30', '32', '34'],
        image: '/images/gray-jeans.jpg'
      }
    ],
    category: 'Clothing'
  },
  {
    id: 3,
    name: 'Running Shoes',
    description: 'High-performance running shoes for athletes.',
    price: 89.99,
    image: '/images/running-shoes.jpg',
    variants: [
      {
        color: 'Black',
        sizes: ['7', '8', '9', '10', '11', '12'],
        image: '/images/black-shoes.jpg'
      },
      {
        color: 'White',
        sizes: ['7', '8', '9', '10', '11'],
        image: '/images/white-shoes.jpg'
      },
      {
        color: 'Red',
        sizes: ['8', '9', '10', '11', '12'],
        image: '/images/red-shoes.jpg'
      },
      {
        color: 'Blue',
        sizes: ['7', '8', '9', '10'],
        image: '/images/blue-shoes.jpg'
      }
    ],
    category: 'Footwear'
  },
  {
    id: 4,
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation.',
    price: 149.99,
    image: '/images/headphones.jpg',
    variants: [
      {
        color: 'Black',
        sizes: ['One Size'],
        image: '/images/black-headphones.jpg'
      },
      {
        color: 'White',
        sizes: ['One Size'],
        image: '/images/white-headphones.jpg'
      },
      {
        color: 'Blue',
        sizes: ['One Size'],
        image: '/images/blue-headphones.jpg'
      }
    ],
    category: 'Electronics'
  },
  {
    id: 5,
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking.',
    price: 199.99,
    image: '/images/smart-watch.jpg',
    variants: [
      {
        color: 'Black',
        sizes: ['Small', 'Medium', 'Large'],
        image: '/images/black-watch.jpg'
      },
      {
        color: 'Silver',
        sizes: ['Small', 'Medium', 'Large'],
        image: '/images/silver-watch.jpg'
      },
      {
        color: 'Gold',
        sizes: ['Small', 'Medium'],
        image: '/images/gold-watch.jpg'
      }
    ],
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

// Function to fetch a single product by ID with client-side caching
export const fetchProductById = async (id) => {
  // Client-side caching (only works in the browser)
  if (typeof window !== 'undefined') {
    const cacheKey = `product_${id}`;
    const cacheTimeKey = `product_${id}_time`;
    const now = new Date().getTime();
    
    // Check if we have a cached version that's less than 5 minutes old
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(cacheTimeKey);
    
    if (cachedData && cacheTime && (now - parseInt(cacheTime, 10)) < 5 * 60 * 1000) {
      return JSON.parse(cachedData);
    }
    
    // Otherwise fetch fresh data
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const product = await response.json();
      
      // Update cache
      localStorage.setItem(cacheKey, JSON.stringify(product));
      localStorage.setItem(cacheTimeKey, now.toString());
      
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      // If fetch fails but we have cached data, return that instead of failing
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      throw error;
    }
  }
  
  // Fallback for server-side rendering or if localStorage is not available
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const product = products.find(p => p.id === id || p.id === parseInt(id));
      resolve(product || null);
    }, 100);
  });
};

export default products;
