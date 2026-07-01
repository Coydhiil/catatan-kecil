import Image from "next/image";
import Hero from "./section/hero";
import Skills from "./section/skills";
import Education from "./section/education";
import Contact from "./section/contact";

export default function Home() {
  return (
    <div>
      <Hero />
      <Skills />
      <Education />
      <Contact />
    </div>
  );
}
