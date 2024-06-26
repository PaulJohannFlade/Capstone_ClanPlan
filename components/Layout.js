import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>ClanPlan - Family Task Manager</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}
