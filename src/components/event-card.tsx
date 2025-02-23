import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface EventCardProps {
  name: string;
  organizationSlug: string;
  id: string;
}

export const EventCard = ({ name, id }: EventCardProps) => {
  return (
    <Link href={`/dashboard/events/${id}`}>
      <Card className="transition-all duration-300 w-[280px] h-[300px] shadow-lg">
        <div className="w-full bg-gray-200 h-[55%]"></div>
        <VisuallyHidden>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </VisuallyHidden>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </Link>
  );
};
