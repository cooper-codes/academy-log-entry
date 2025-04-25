
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { LogEntry } from '@/types/LogEntry';
import { Edit, Trash2, MapPin, Calendar } from 'lucide-react';
import { format, parse } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

interface LogEntryItemProps {
  entry: LogEntry;
  onEdit: (entry: LogEntry) => void;
  onDelete: (id: string) => void;
}

const LogEntryItem: React.FC<LogEntryItemProps> = ({ entry, onEdit, onDelete }) => {

  const formatDate = (dateString: string) => {
    // Have to parse as dates comes in YYYY-MM-DD format and date-fns needs a Date object
    // to format it correctly. This is a workaround to avoid using moment.js or other libraries.
    const date = parse(dateString, 'yyyy-MM-dd', new Date());
    return format(date, 'MMMM d, yyyy');
  }

  // Format date to be more readable with timezone consideration
  const formatDateTime = (dateString: string) => {

    try {
      // Get the user's timezone
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Format the date in the user's timezone
      return formatInTimeZone(
        new Date(dateString),
        userTimezone,
        'MMMM d, yyyy h:mm a'
      );
    } catch (error) {
      console.error("Error formatting date:", error);
      // Fallback to basic formatting if there's an error
      return format(new Date(dateString), 'MMMM d, yyyy');
    }
  };

  return (
    <Card role='article' className="mb-4 shadow-xs hover:shadow-md transition-shadow duration-200 fade-in">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{entry.name}</CardTitle>
          <div className="text-sm text-muted-foreground mt-2">
             Updated: {formatDateTime(entry.updatedAt)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base mb-4">{entry.description}</p>
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(entry.date)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{entry.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(entry)}
        >
          <Edit className="w-4 h-4 mr-1" /> Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(entry.id)}
          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LogEntryItem;
