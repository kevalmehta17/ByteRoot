"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Icons, type IconKey } from "@/components/icons"; // Assuming IconKey type is exported
import { Icons, type IconKey } from "@/components/icons";

export interface NotificationItemProps {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  icon: IconKey;
  isNew?: boolean;
  category?: string; // e.g., "Appointment", "Medication", "Lab Result"
  onClick?: () => void;
}

export function NotificationItem({
  title,
  description,
  timeAgo,
  icon,
  isNew,
  category,
  onClick,
}: NotificationItemProps) {
  const IconComponent = Icons[icon] || Icons.notifications; // Default to notifications (Bell) icon

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md ${
        onClick ? "cursor-pointer" : ""
      } ${isNew ? "border-primary" : ""}`}
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-start space-x-4">
        <div
          className={`p-2 rounded-full mt-1 ${
            isNew ? "bg-primary/10" : "bg-muted"
          }`}
        >
          <IconComponent
            className={`h-6 w-6 ${
              isNew ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </div>
        {/* this will render the title and New badge */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            {isNew && (
              <Badge variant="default" className="text-xs">
                New
              </Badge>
            )}
          </div>
          {/* this will render the category with Badge so looks good */}
          {category && (
            <Badge variant="outline" className="text-xs mt-1 mb-1.5">
              {category}
            </Badge>
          )}
          {/* this will render the description and time ago */}
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </CardDescription>
          <p className="text-xs text-muted-foreground/80 mt-1.5">{timeAgo}</p>
        </div>
      </CardContent>
    </Card>
  );
}
