import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
export default function Home() {
  return (
    <div className="flex flex-col gap-24 my-16">
      <Hero />
      <Features />
    </div>
  );
}
