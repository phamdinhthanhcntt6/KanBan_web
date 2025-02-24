import FooterComponent from "@/components/FooterComponent";
import HeaderComponent from "@/components/HeaderComponent";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="p-4 max-w-7xl bg-red-300 mx-auto">
      <HeaderComponent />
      <Button>Link</Button>
      <FooterComponent />
    </div>
  );
}
