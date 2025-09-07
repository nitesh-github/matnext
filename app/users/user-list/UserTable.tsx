"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
  Typography
} from "@mui/material";
import PaginationClient from "@/app/components/PaginationClient";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { fetchUsers } from "./userListActions";
import { useSearchParams } from "next/navigation";
interface User {
  _id: string;
  name: string;
  email: string;
}

interface UserResponse {
  users: User[];
  totalCount: number;
}

export default function UserTable() {
  const [data, setData] = useState<UserResponse | null>(null);
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") ?? "1";
  const page = parseInt(pageParam);
  useEffect(() => {
    fetchUsers(page).then((res) => {
      setData(res);
    });
  }, [page]);

  if (!data || data.users.length === 0) {
    return <Typography>No users found.</Typography>;
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data?.users.map((user, i) => (
            <TableRow key={user._id}>
              <TableCell>{((page - 1) * 10 ) + i + 1 }</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell align="right">
                <IconButton size="small" color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box mt={2}>
        <PaginationClient total={data?.totalCount} />
      </Box>
    </>
  );
}
