import { Appbar } from "@/comp/Appbar";
import { HeroVideo } from "@/comp/herovedio";

export default function Home() {
  return (
    <div className="">
      <Appbar/>
      <div className="pt-8">
          <HeroVideo />
        </div>
    </div>
  );
}
