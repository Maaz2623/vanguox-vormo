import { eventsRouter } from "@/modules/events/server/procedure";
import { createTRPCRouter } from "../init";
import { organizationsRouter } from "@/modules/organizations/server/procedure";
export const appRouter = createTRPCRouter({
  organizations: organizationsRouter,
  events: eventsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
