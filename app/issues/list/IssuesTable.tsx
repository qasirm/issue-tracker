import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

const IssuesTable = async ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        {columns.map((column) => (
          <Table.ColumnHeaderCell
            key={column.value}
            className={column.className}
          >
            <NextLink
              href={{
                query: { ...searchParams, orderBy: column.value },
              }}
            >
              {column.label}
            </NextLink>
            {column.value === searchParams.orderBy && (
              <ArrowUpIcon className="inline" />
            )}
          </Table.ColumnHeaderCell>
        ))}
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];
export const columnNames = columns.map((column) => column.value);

export default IssuesTable;
