import Head from "next/head";
import Link from "next/link";

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Thank You!</title>
        <meta name='description' content='Success' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex min-h-screen flex-col text-gray-900 items-center justify-center'>
        <div className='flex items-center justify-center flex-col p-4'>
          <h1 className='text-3xl font-bold'>Thank you!</h1>
          <p>Your donation has been received.</p>
        </div>
        <Link className='font-semibold' href='/'>
          Go back
        </Link>
      </main>
    </>
  );
}
