import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { DONATION_IN_CENTS, MAX_DONATION_IN_CENTS } from "@/config";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Record } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ donations }: { donations: Array<Record> }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const presets = [1, 3, 5];

  async function handleCheckout() {
    setError(null);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity,
        name,
        message,
      }),
    });

    const res = await response.json();

    if (res.url) {
      const url = res.url;
      router.push(url);
    }
    if (res.error) {
      setError(res.error);
    }
  }

  return (
    <main className={`text-gray-800 ${inter.className}`}>
      <section className='min-h-screen w-full flex items-center justify-center'>
        <div className='bg-white gap-4 w-full sm:max-w-md items-center justify-center flex flex-col  sm:rounded-2xl p-12'>
          <h1 className='text-3xl font-bold mb-4'>Buy me a Coffee</h1>
          {error && (
            <div className='text-red-600 mb-4 font-semibold text-sm'>
              {error}
            </div>
          )}
          <div className='flex flex-col sm:flex-row w-full gap-4 sm:gap-2 items-center'>
            <div className='flex w-fit items-center justify-center gap-2'>
              <Image
                src={"/coffee.svg"}
                alt={"coffee"}
                width={50}
                height={100}
              />
              <span className='font-semibold'>X</span>
              {presets.map((preset) => {
                return (
                  <button
                    className='rounded-full duration-300 ease-in-out focus:bg-indigo-700 hover:bg-indigo-500 w-8 h-8 bg-indigo-600 p-1 text-white'
                    key={preset}
                    onClick={() => setQuantity(preset)}>
                    {preset}
                  </button>
                );
              })}
            </div>
            <input
              className='rounded-full grow w-full sm:w-auto bg-slate-100 outline-none py-2 px-4'
              type='number'
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
              value={quantity}
              min={1}
              max={MAX_DONATION_IN_CENTS / DONATION_IN_CENTS}
            />
          </div>
          <div className='flex flex-col w-full gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-sm pl-4' htmlFor='name'>
                Name:
              </label>
              <input
                className='rounded-full outline-none bg-slate-100 py-2 px-4'
                type='text'
                id='name'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-sm pl-4' htmlFor='message'>
                Message:
              </label>
              <textarea
                className='rounded-2xl outline-none bg-slate-100 py-2 px-4'
                id='message'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            <button
              onClick={handleCheckout}
              disabled={quantity > 0 ? false : true}
              className={`text-white rounded-full px-3 mt-2 py-2 w-full ease-in-out duration-300 ${
                quantity && quantity > 0
                  ? "bg-indigo-600 focus:bg-indigo-700 hover:bg-indigo-500"
                  : "bg-slate-400"
              }`}>
              Donate{" "}
              {quantity >= 0 && "$" + quantity * (DONATION_IN_CENTS / 100)}
            </button>
          </div>
        </div>
      </section>
      <section className='min-h-screen w-full flex items-center justify-center'>
        <div className='flex flex-col w-full sm:max-w-md bg-white gap-4 items-center sm:rounded-2xl p-12'>
          <h2 className='text-2xl font-bold mb-4'>Previous donations</h2>
          {donations.map((donation) => {
            return (
              <>
                <div
                  key={donation.id}
                  className=' py-2 space-y-2 w-full border-b mb-2'>
                  <span>{new Date(donation.createdTime).toLocaleString()}</span>
                  <div className='justify-between flex'>
                    <span>{donation.fields.name}</span>
                    <span>Donated ${donation.fields.amount}</span>
                  </div>
                  <br />
                  <span>{donation.fields.message}</span>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";

  const response = await fetch(
    `${protocol}://${context.req.headers.host}/api/donations`
  );

  const donations = await response.json();

  return {
    props: {
      donations,
    },
  };
};
