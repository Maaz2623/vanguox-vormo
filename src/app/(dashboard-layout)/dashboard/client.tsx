"use client";

import React from "react";
import { trpc } from "@/trpc/client";

const Client = () => {
  const [data] = trpc.hello.useSuspenseQuery({
    text: "Maaz",
  });

  return <div>{data.greeting}</div>;
};

export default Client;
