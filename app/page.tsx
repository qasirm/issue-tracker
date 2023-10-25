import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Grid, Flex } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5" style={{ height: 500 }}>
      <Flex direction="column" gap="5">
        <IssueSummary inProgress={inProgress} closed={closed} open={open} />
        <IssueChart inProgress={inProgress} closed={closed} open={open} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
