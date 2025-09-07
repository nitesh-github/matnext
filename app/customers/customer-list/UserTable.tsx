"use client";
import { useMemo } from "react";
import { fetchUsers } from "./userListActions";
import { useSearchParams } from "next/navigation";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ValueGetterParams,
  ModuleRegistry,
  AllCommunityModule,
  IGetRowsParams,
  InfiniteRowModelModule,
} from "ag-grid-community";

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule, InfiniteRowModelModule]);

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
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") ?? "1";
  const page = parseInt(pageParam) ?? 1;
  const pageSize = 10;

  // Define columns
  const columnDefs: ColDef<User>[] = useMemo(
    () => [
      {
        headerName: "S.No.",
        valueGetter: (params: ValueGetterParams<User>) =>
          (page - 1) * pageSize + ((params.node?.rowIndex ?? 0) + 1),
        width: 100,
      },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      {
        headerName: "Actions",
        cellRenderer: () => (
          <div>
            <button style={{ marginRight: "8px" }}>✏️</button>
            <button>🗑️</button>
          </div>
        ),
        width: 150,
      },
    ],
    [page]
  );

  // Set datasource for Infinite Row Model
  // const onGridReady = useCallback((params: GridReadyEvent) => {
  //   const datasource: IDatasource = {
  //     getRows: async (gridParams: IGetRowsParams) => {
  //       const page =
  //         Math.floor((gridParams.startRow ?? 0) / pageSize) + 1;
  //       const res: UserResponse = await fetchUsers(page);
  //       // Supply rows back to grid
  //       gridParams.successCallback(res.users, res.totalCount);
  //     },
  //   };
  //   (params.api as _InfiniteRowModelGridApi).setDatasource(datasource);
  // }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowModelType="serverSide"
        columnDefs={columnDefs}
        //cacheBlockSize={pageSize}
        pagination={true}
        paginationPageSize={10}
        datasource={{
          getRows: async (gridParams: IGetRowsParams) => {
            const page = Math.floor((gridParams.startRow ?? 0) / pageSize) + 1;
            const res: UserResponse = await fetchUsers(page);
            gridParams.successCallback(res.users, res.totalCount);
          },
        }}
      />
    </div>
  );
}
