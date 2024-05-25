import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import { useRecentBookings } from "../features/dashboard/useRecentBookings";
import Spinner from "../ui/Spinner";

function Dashboard() {
  const { isLoading } = useRecentBookings();

  if (isLoading) return <Spinner />;

  return (
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <DashboardFilter />

      <DashboardLayout />
    </Row>
  );
}

export default Dashboard;
