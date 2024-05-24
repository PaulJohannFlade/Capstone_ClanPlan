import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, isDarkTheme, setDarkTheme, user }) {
  return (
    <>
      <Header
        isDarkTheme={isDarkTheme}
        setDarkTheme={setDarkTheme}
        user={user}
      />
      {children}
      <Footer />
    </>
  );
}
