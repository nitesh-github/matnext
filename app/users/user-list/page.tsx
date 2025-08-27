import { Typography } from "@mui/material";
import UserTable from "./UserTable";

export default async function UserList({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const searchParam = await searchParams;
  const page = searchParam.page ? parseInt(searchParam.page) : 1;

  return (
    <>
        <Typography variant="h5" gutterBottom>
          Material User List
        </Typography>
        <UserTable page={page} />
    </>
  );
}
