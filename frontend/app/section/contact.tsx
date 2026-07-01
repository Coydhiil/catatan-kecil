import Button from "../ui/button";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="px-4 py-6">
      <h1 className="font-bold text-xl">📞Contact</h1>
      <div className="flex flex-wrap gap-3 mt-5">
        <Link
          href="https://www.linkedin.com/in/pramudya-diagusta/"
          target="_blank"
        >
          <Button>Linkedin</Button>
        </Link>
        <Link href="https://github.com/pramudya" target="_blank">
          <Button>Github</Button>
        </Link>
        <Link href="https://www.instagram.com/pramudya.diagusta/" target="_blank">
          <Button>Instagram</Button>
        </Link>
        <Link href="mailto:pramudya.diagusta@gmail.com">
          <Button>Email</Button>
        </Link>
      </div>
    </div>
  );
}
