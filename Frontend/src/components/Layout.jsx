import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: "20px 40px" }}>
        {children}
      </main>
    </>
  );
}
