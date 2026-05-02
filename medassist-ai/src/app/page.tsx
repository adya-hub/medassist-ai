import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />
      <div className="flex-1 w-full flex overflow-hidden">
        <ChatInterface />
      </div>
    </main>
  );
}

