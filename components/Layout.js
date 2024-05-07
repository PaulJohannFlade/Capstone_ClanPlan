import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, isDarkTheme, onToggleTheme }) {
  return (
    <>
      <Header isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />
      {children}
      <Footer />
    </>
  );
}
