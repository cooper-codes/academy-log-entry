
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_LOG_ENTRIES, CREATE_LOG_ENTRY, UPDATE_LOG_ENTRY, DELETE_LOG_ENTRY } from '@/lib/apollo';
import Header from '@/components/Header';
import LogEntryForm from '@/components/LogEntryForm';
import LogEntryList from '@/components/LogEntryList';
import { LogEntry } from '@/types/LogEntry';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/shared/alert-dialog';
import { toast } from '@/hooks/use-toast';
import ErrorState from '@/components/ErrorState';
import LoadingSpinner from '@/components/shared/loading';
import Wrapper from '@/components/Wrapper';

const Index = () => {
  const [editingEntry, setEditingEntry] = useState<LogEntry | null>(null);
  const [deleteEntryId, setDeleteEntryId] = useState<string | null>(null);

  const { data, loading, error } = useQuery(GET_LOG_ENTRIES);
  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);
  const [updateLogEntry] = useMutation(UPDATE_LOG_ENTRY);
  const [deleteLogEntry] = useMutation(DELETE_LOG_ENTRY);

  const logEntries = data?.logEntries || [];
  const previousName = logEntries.length > 0 ? logEntries[0].name : '';

  const handleSaveEntry = async (entryData: Omit<LogEntry, 'updatedAt' | 'createdAt'>) => {
    try {
      if (editingEntry) {
        await updateLogEntry({
          variables: {
            id: editingEntry.id,
            input: entryData,
          },
          refetchQueries: [{ query: GET_LOG_ENTRIES }]
        });

        setEditingEntry(null);
        toast({
          title: "Entry Updated",
          description: "Your log entry has been updated successfully."
        });
      } else {
        await createLogEntry({
          variables: {
            input: entryData
          },
          refetchQueries: [{ query: GET_LOG_ENTRIES }]
        });

        toast({
          title: "Entry Created",
          description: "Your log entry has been saved successfully."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your request.",
        variant: "destructive"
      });
    }
  };

  const handleEditEntry = (entry: LogEntry) => {
    setEditingEntry(entry);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteEntryId) {
      try {
        await deleteLogEntry({
          variables: { id: deleteEntryId },
          refetchQueries: [{ query: GET_LOG_ENTRIES }]
        });

        setDeleteEntryId(null);
        toast({
          title: "Entry Deleted",
          description: "Your log entry has been deleted."
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an error deleting the entry.",
          variant: "destructive"
        });
      }
    }
  };

  if (loading) return (
    <Wrapper>
      <Header />
      <LoadingSpinner />
    </Wrapper>
  )
  if (error) return (
    <Wrapper>
      <Header />
      <ErrorState />
    </Wrapper>
  )

  return (
    <Wrapper>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <LogEntryForm
          existingEntry={editingEntry || undefined}
          previousName={previousName}
          onSave={handleSaveEntry}
          onCancel={editingEntry ? handleCancelEdit : undefined}
        />
        <LogEntryList
          entries={logEntries}
          onEdit={handleEditEntry}
          onDelete={(id) => setDeleteEntryId(id)}
        />
      </main>

      <AlertDialog open={!!deleteEntryId} onOpenChange={() => setDeleteEntryId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the log entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Wrapper>
  );
};

export default Index;
