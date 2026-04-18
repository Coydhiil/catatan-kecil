import Image from "next/image";
import Button from "./button";
import Link from "next/link";

export default function Card({
  title,
  image,
  description,
  website,
  github,
}: any) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 space-y-4">
      <h1 className="font-bold">{title}</h1>
      <div className="aspect-video w-full rounded overflow-hidden">
        <Image
          src={image}
          alt="face"
          width={200}
          height={200}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <p className="text-sm">{description}</p>
      <div className="space-x-2">
        <Link href={website}>
          <Button>Website</Button>
        </Link>
        <Link href={github}>
          <Button>Github</Button>
        </Link>
      </div>
    </div>
  );
}