import Card from "../ui/card";

export default function Page() {
  return (
    <div>
      <h1 className="font-semibold text-xl">🚀Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <Card
          title="Project 1"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Prabowo_Subianto_2024_official_portrait.jpg/250px-Prabowo_Subianto_2024_official_portrait.jpg"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, veritatis!"
          website="/"
          github="/"
          className="col-span-1 sm:col-span-2"
        />
        <Card
          title="Project 2"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Prabowo_Subianto_2024_official_portrait.jpg/250px-Prabowo_Subianto_2024_official_portrait.jpg"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, veritatis!"
          website="/"
          github="/"
          className="col-span-1 sm:col-span-2"
        />
        <Card
          title="Project 3"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Prabowo_Subianto_2024_official_portrait.jpg/250px-Prabowo_Subianto_2024_official_portrait.jpg"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, veritatis!"
          website="/"
          github="/"
          className="col-span-1 sm:col-span-2"
        />
      </div>
    </div>
  );
}