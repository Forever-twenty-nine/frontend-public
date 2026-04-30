"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function RedirectInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("register") === "true") {
      router.push("/register");
    }
  }, [searchParams, router]);

  return null;
}

export default function HomeRedirectHandler() {
  return (
    <Suspense fallback={null}>
      <RedirectInner />
    </Suspense>
  );
}
