import { Skeleton } from "@/app/components";
import { Box, Button, Card, Flex, Grid } from "@radix-ui/themes";

const LoadingIssueDetailsPage = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Skeleton className="max-w-xl" />
        <Flex gap="2" my="2">
          <Skeleton width="5rem" />
          <Skeleton width="8rem" />
        </Flex>
        <Card className="prose" mt="4">
          <Skeleton count={3} />
        </Card>
      </Box>
      <Box>
        <Button>Edit Issue</Button>
      </Box>
    </Grid>
  );
};

export default LoadingIssueDetailsPage;
