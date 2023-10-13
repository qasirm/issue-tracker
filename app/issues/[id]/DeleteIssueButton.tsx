"use client";
import { AlertDialog, Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            color="red"
            onClick={async () => {
              await axios.delete("/api/issues/" + issueId);
              router.push("/issues");
              router.refresh();
            }}
          >
            Delete Issue
          </Button>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure you want to delete this issue? This action cannot be
              undone.
            </AlertDialog.Description>
          </AlertDialog.Content>
        </AlertDialog.Trigger>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
