import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center h-[650px] bg-gray-100">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Prabowo_Subianto_2024_official_portrait.jpg/250px-Prabowo_Subianto_2024_official_portrait.jpg"
        alt="hero"
        width={250}
        height={250}
        className="rounded-3xl mb-6 shadow-lg shadow-gray-400"
      />
      <h1 className="text-4xl text-center font-bold mb-2">
        Prabowo Subianto
      </h1>
      <h1 className="text-xl text-center font-bold mb-4">
        Welcome to My Portfolio
      </h1>
      <p className="w-full text-center text-lg text-gray-600 mb-8">
        Im a passionate developer creating amazing web experiences.
      </p>
    </div>
  );
}