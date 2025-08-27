"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import PaginationClient from "@/app/components/PaginationClient";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { fetchUsers } from "./userListActions";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface UserResponse {
  users: User[];
  totalCount: number;
}

export default function UserTable({ page }: { page: number }) {
  const [data, setData] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUsers(page).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [page]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data || data.users.length === 0) {
    return <Typography>No users found.</Typography>;
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users.map((user) => (
            <TableRow key={user._id}>
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
        <PaginationClient total={data.totalCount} />
      </Box>
    </>
  );
}
