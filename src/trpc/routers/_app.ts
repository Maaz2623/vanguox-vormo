import { createTRPCRouter } from "../init";
import { organizationsRouter } from "@/modules/organizations/server/procedure";
export const appRouter = createTRPCRouter({
  organizations: organizationsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
