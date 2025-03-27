import { List, ListItem, ListItemText, Typography, Container, Box } from "@mui/material";
import PaginationClient from "@/app/components/PaginationClient";
interface User {
    _id: string;
    name: string;
    email: string;
  }
export default async function UserList({ searchParams }: { searchParams: { page?: string } }) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const data = await fetchUsers(page);
    const users = data.users;
    const total = data.total;
    
    return (
      <>
      <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Material UI List in Next.js
      </Typography>
      <List>
        {users.map((user:User) => (
          <ListItem key={user._id} divider>
            <ListItemText primary={user.name} />
            <ListItemText primary={user.email} />
          </ListItem>
        ))}
      </List>

      {/* Pagination Component */}
      <Box display="flex" justifyContent="center" mt={2}>
      <PaginationClient total={total} />
      </Box>
    </Container>
      </>
    
  );
  }


  async function fetchUsers(page:number) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/get-all?page=${page}&limit=10`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Prevents caching (optional)
      });
  
      if (!res.ok) throw new Error("Failed to fetch users");
      const res2 =  await res.json();
      return res2;
    } catch (err) {
      console.error("Error fetching users:", err);
      return [];
    }
  }