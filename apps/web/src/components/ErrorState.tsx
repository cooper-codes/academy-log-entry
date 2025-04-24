import React from 'react';
import { FileText } from 'lucide-react';

const ErrorState: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg border-dashed border-muted">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No entries found</h3>
            <p className="text-muted-foreground text-center">
                There was an error connecting to the database. Please try again later.
            </p>
        </div>
    );
};

export default ErrorState;