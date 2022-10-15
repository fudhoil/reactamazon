import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import CryptoJS from "crypto-js";
// import axios from "axios";

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const session = useSession();

  // adjust with your iPaymu api key & va
  var apikey = "SANDBOX7DA52600-EA2C-474E-9F10-96C45E11C825";
  var va = "0000001258357255";
  var url = "https://sandbox.ipaymu.com/api/v2/payment"; // development mode
  // var url             = 'https://my.ipaymu.com/api/v2/payment/direct'; // for production mode

  const product = items.map((item) => item.title);
  const qty = items.map((item) => parseInt(item.qty));
  const price = items.map((item) => parseInt(item.price));
  const amount = String(total);

  console.log("product", product);
  console.log("qty", qty);
  console.log("price", price);
  console.log("amount", amount);
  const createCheckoutSession = async () => {
    var body = {
      product: product,
      qty: qty,
      price: price,
      amount: amount,
      returnUrl: "https://reactamazon.vercel.app/checkout", //your thank you page url
      cancelUrl: "https://reactamazon.vercel.app/checkout", // your cancel page url
      notifyUrl: "https://reactamazon.vercel.app/notification", // your callback url
      referenceId: "31412", // your reference id or transaction id
      buyerName: session?.data?.user?.name, // optional
      buyerEmail: session?.data?.user?.email, // optional
    };
    console.log("body product", body.product);
    // generate signature
    var bodyEncrypt = CryptoJS.SHA256(JSON.stringify(body));
    var stringtosign = "POST:" + va + ":" + bodyEncrypt + ":" + apikey;
    var signature = CryptoJS.enc.Hex.stringify(
      CryptoJS.HmacSHA256(stringtosign, apikey)
    );
    console.log("signature", signature);
    // request
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        va: va,
        signature: signature,
        timestamp: "20150201121045",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // response
        console.log(responseJson);
        window.location.href = responseJson.Data.Url;
      });
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                rating={item.rating}
                hasPrime={item.hasPrime}
                qty={item.qty}
              />
            ))}
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="IDR" />
                </span>
              </h2>
              <button
                onClick={createCheckoutSession}
                role="link"
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}>
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
