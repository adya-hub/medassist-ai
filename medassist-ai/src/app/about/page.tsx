import DeveloperProfile from "@/components/DeveloperProfile";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Developer | MedAssist AI",
  description: "Learn about Adya Sharma, the Cloud & DevOps engineer who built MedAssist AI.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />
      <main className="flex-1">
        <DeveloperProfile />
      </main>
      <Footer />
    </div>
  );
}
