import NavBar from "@/components/NavBar";
import Products from "@/components/Products";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  return (
    <div className={poppins.className}>
      <NavBar />
      <Products />
    </div>
  );
}
