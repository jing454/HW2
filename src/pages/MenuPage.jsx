import React from 'react';
import { useCart } from '../cart/CartContext';

const menuSections = [
  {
    title: 'Main Courses',
    items: [
      {
        id: 'burger-1',
        name: 'Classic Cheese Burger Combo',
        description: 'Melted cheese on top of a fresh beef patty',
        price: 12.99,
        image: '/assets/Menu/items/Cheeseburger.png',
        alt: 'Burger',
      },
      {
        id: 'pasta-1',
        name: 'Pasta',
        description: 'Creamy delight pasta',
        price: 14.99,
        image: '/assets/Menu/items/Pasta.png',
        alt: 'Pasta',
      },
      {
        id: 'pizza-1',
        name: "12' Cheese Pizza",
        description: 'Fresh and Classic cheese pizza',
        price: 11.99,
        image: '/assets/Menu/items/Pizza.png',
        alt: 'Pizza',
      },
    ],
  },
  {
    title: 'Drinks',
    items: [
      {
        id: 'coke-1',
        name: 'Coca-Cola',
        description: 'Classic coke',
        price: 2.99,
        image: '/assets/Menu/items/coca-cola.png',
        alt: 'Coca-Cola',
      },
      {
        id: 'sprite-1',
        name: 'Sprite',
        description: 'classic sprite',
        price: 2.49,
        image: '/assets/Menu/items/sprite.png',
        alt: 'Sprite',
      },
      {
        id: 'oj-1',
        name: 'Orange Juice',
        description: 'Made from fresh oranges',
        price: 2.99,
        image: '/assets/Menu/items/oj.png',
        alt: 'Orange Juice',
      },
    ],
  },
];

export default function MenuPage() {
  const { addItem } = useCart();

  return (
    <main>
      <h1>Menu Items</h1>

      {menuSections.map(section => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <div className="menu-container">
            {section.items.map(item => (
              <article className="card" key={item.id}>
                <img src={item.image} alt={item.alt} />
                <div className="card-content">
                  <h4><b>{item.name}</b></h4>
                  <p>{item.description}</p>
                  <span className="price">${item.price.toFixed(2)}</span>
                  <button
                    className="btn-add-to-cart"
                    type="button"
                    onClick={() => addItem(item.id, item.name, item.price)}
                  >
                    <i className="fas fa-shopping-cart" /> Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
