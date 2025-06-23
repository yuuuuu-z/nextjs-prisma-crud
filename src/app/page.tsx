import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-4">
      <Button asChild size="lg">
        <Link href="/post-server-action">
          Server Action Example (Server Component)
        </Link>
      </Button>
    </div>
  );
}
