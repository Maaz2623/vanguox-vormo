"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { handleSignin } from "@/actions/auth.actions";

export const SigninCard = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Vormo</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                onClick={handleSignin}
                className="w-full"
              >
                <FcGoogle />
                Login with Google
              </Button>
            </div>
          </div>
          <Separator className="mt-8" />
          <div className="w-full h-10 mt-4 flex justify-center items-center">
            <p className="text-sm text-muted-foreground">
              Developed by <span className="font-semibold">Vanguox</span>
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};
