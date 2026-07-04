import React from 'react';

export default function HomePage() {
  return (
    <main className="Home_content">
      <section className="hero-copy">
        <div className="hero-brand">
          <div className="logo2">
            <img src="/assets/logo.png" alt="Logo" width="70" height="70" />
            <span>Restaurant X</span>
          </div>
        </div>
        <h1><span className="color">Bringing people together,</span> one plate at a time!</h1>
        <p className="subtext">Craving something tasty? No matter what time of the day it is, it's never too late for food!</p>
        <p className="subtext">About us: Created in 2026, we want to offer a affordable and delicious dining experience. Our mission is to provide food to the people at an affordable price!</p>
      </section>

      <section className="hero-visual" aria-label="Food delivery visual">
        <img src="/assets/Home/img/burger.png" alt="Food delivery visual" />
      </section>
    </main>
  );
}
