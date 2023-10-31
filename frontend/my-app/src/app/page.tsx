import Menu from "./components/menu";
import Products from "./components/products";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <div className="grid grid-rows-2">
        <Menu />
        <Products />
      </div>
    </main>
  );
}
