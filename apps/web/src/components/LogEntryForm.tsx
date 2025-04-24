
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LogEntry } from '@/types/LogEntry';
import { toast } from '@/hooks/use-toast';

interface LogEntryFormProps {
  existingEntry?: LogEntry;
  previousName?: string;
  onSave: (entry: Omit<LogEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
}

const LogEntryForm: React.FC<LogEntryFormProps> = ({ existingEntry, previousName, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');

  // Update form when existingEntry or previousName changes
  useEffect(() => {
    if (existingEntry) {
      setName(existingEntry.name);
      setDescription(existingEntry.description);
      setDate(existingEntry.date);
      setLocation(existingEntry.location);
    } else if (previousName) {
      setName(previousName);
      // Reset other fields for new entries
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      setLocation('');
    }
  }, [existingEntry, previousName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive"
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Description is required",
        variant: "destructive"
      });
      return;
    }

    if (!location.trim()) {
      toast({
        title: "Error",
        description: "Location is required",
        variant: "destructive"
      });
      return;
    }

    onSave({
      name,
      description,
      date,
      location
    });

    // Clear form if it's not an existing entry
    if (!existingEntry) {
      setDescription('');
      setLocation('');
    }
  };

  return (
    <Card className="w-full fade-in mb-6">
      <CardHeader>
        <CardTitle>{existingEntry ? 'Edit Log Entry' : 'Create New Log Entry'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the event"
              required
              rows={4}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">
                Date
              </label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">
                Location
              </label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where did this happen?"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          {onCancel && (
            <Button variant="outline" onClick={onCancel} type="button">
              Cancel
            </Button>
          )}
          <Button type="submit">
            {existingEntry ? 'Update' : 'Save'} Entry
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LogEntryForm;
