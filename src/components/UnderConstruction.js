import React from "react";
import "../style/UnderConstruction.css";

export default function UnderConstruction() {
  return (
    <div className="construction">
      <div className="overlay"></div>
      <div className="stars" aria-hidden="true"></div>
      <div className="starts2" aria-hidden="true"></div>
      <div className="stars3" aria-hidden="true"></div>
      <main className="main">
        <section className="contact">
          <h1 className="title">Strum On In</h1>
          <h2 className="sub-title">Site Under Construction</h2>
        </section>
      </main>
    </div>
  );
}
