
import React from 'react';
import { FileText } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg border-dashed border-muted">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No entries yet</h3>
      <p className="text-muted-foreground text-center">
        Create your first log entry using the form above.
      </p>
    </div>
  );
};

export default EmptyState;
