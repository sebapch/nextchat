'use client'


import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from 'react-hot-toast';
import Button from "@/components/ui/Button";



const Page:FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
        toast.error('Algo salio mal con tu login.')
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col items-center max-w-md space-y-8">
          <div className="flex flex-col items-center gap-8">
            LOGO
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tifht text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <Button
            isLoading={isLoading}
            type="button"
            className="max-w-sm mx-auto w-full"
            onClick={loginWithGoogle}
          >
            {isLoading ? null : "Google"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
