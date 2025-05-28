'use client';

// Libraries
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RootPage: React.FC = () => {

  const router = useRouter();

  useEffect(() => {
    router.push("/search");
  }, []);

  return null;

};

export default RootPage;
