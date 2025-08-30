import { Typography, CircularProgress } from "@mui/material";
import UserTable from "./UserTable";
import { Suspense } from "react";
export default async function UserList() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Material User List
      </Typography>
      <Suspense fallback={<CircularProgress />}>
        <UserTable />
      </Suspense>
    </>
  );
}
