import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/* banner */}
        <Banner />
        {/* Product feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  let data = products.map((product) => ({ ...product, qty: 0 }));
  data = data.map((product) => ({ ...product, price: "5000" }));
  data = data.map((product) => ({
    ...product,
    title: "product sdwesd s " + product.id,
  }));
  return {
    props: {
      products: data,
    },
  };
}
