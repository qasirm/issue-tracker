import { Status } from ".prisma/client";
import IssuesTable, { IssueQuery, columnNames } from "./IssuesTable";
import IssuesToolbar from "./IssuesToolbar";
import prisma from "@/prisma/client";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
  });
  return (
    <div>
      <IssuesToolbar />
      <IssuesTable searchParams={searchParams} issues={issues} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
