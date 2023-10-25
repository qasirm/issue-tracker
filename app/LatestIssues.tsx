import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";
import NextLink from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    include: { assignedToUser: true },
  });
  return (
    <Card className="p-3 h-96">
      <Heading size="4" mb="2">
        Latest Issues
      </Heading>
      <Table.Root style={{ overflow: "auto" }}>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="3">
                    <NextLink href={`/issues/${issue.id}`}>
                      {issue.title}
                    </NextLink>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      size="2"
                      radius="full"
                      src={issue.assignedToUser.image!}
                      fallback="?"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
