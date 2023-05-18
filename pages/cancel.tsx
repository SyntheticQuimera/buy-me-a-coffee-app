import Head from "next/head";
import Link from "next/link";

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Cancel</title>
        <meta name='description' content='cancel' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex min-h-screen flex-col text-gray-900 items-center justify-center'>
        <div className='flex items-center justify-center p-4'>
          <h1 className='text-3xl font-bold'>
            OOPS... Sorry you had to cancel
          </h1>
        </div>
        <Link className='font-semibold' href='/'>
          Go back
        </Link>
      </main>
    </>
  );
}
