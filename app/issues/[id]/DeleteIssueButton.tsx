import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <Button
      color="red"
      onClick={async () => {
        await axios.delete("api/issue/" + issueId);
        router.push("/issues");
        router.refresh();
      }}
    >
      Delete Issue
    </Button>
  );
};

export default DeleteIssueButton;
