import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import GettingStarted from "@/components/landing/getting-started";
import Footer from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 my-16">
      <Hero />
      {/* <GettingStarted /> */}
      <Features />
    </div>
  );
}
