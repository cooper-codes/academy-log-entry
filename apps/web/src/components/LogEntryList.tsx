
import React from 'react';
import { LogEntry } from '@/types/LogEntry';
import LogEntryItem from './LogEntryItem';
import EmptyState from './EmptyState';

interface LogEntryListProps {
  entries: LogEntry[];
  onEdit: (entry: LogEntry) => void;
  onDelete: (id: string) => void;
}

const LogEntryList: React.FC<LogEntryListProps> = ({ entries, onEdit, onDelete }) => {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  // Sort entries by date, most recent first
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your Log Entries</h2>
      {sortedEntries.map((entry) => (
        <LogEntryItem 
          key={entry.id} 
          entry={entry} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default LogEntryList;
