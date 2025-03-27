import { List, ListItem, ListItemText, Typography, Container } from "@mui/material";
interface User {
    _id: string;
    name: string;
    email: string;
  }
export default async function UserList() {
    const users = await fetchUsers();
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
    </Container>
      </>
    
  );
  }

  // async function fetchUsers() {
  //   const configHeaders = {
  //       headers: {
  //        // Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       }
  //     };
  //     try {
  //       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/get-all`, configHeaders);
  //       return response.data;
  //       //setData(response?.data?.data?.users);
  //       // let totalPageCount = Math.ceil(response?.data?.data?.totalCount / 10);
  //       // setpageCount(totalPageCount);
  //       // setError(null);
  //     } catch (err) {
  //       console.error("Error fetching users:", err);
  //       return [];
  //     }
  // }

  async function fetchUsers() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/get-all`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Prevents caching (optional)
      });
  
      if (!res.ok) throw new Error("Failed to fetch users");
      return await res.json();
    } catch (err) {
      console.error("Error fetching users:", err);
      return [];
    }
  }