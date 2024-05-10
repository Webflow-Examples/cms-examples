import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

const ItemsList = ({ collection, collectionDetails, onSchemaLoad }) => {
  const [items, setItems] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Collection Details, including the collection fields
        const schemaResponse = await axiosInstance.get(
          `/collections/${collection}/details`
        );
        onSchemaLoad(schemaResponse.data);
        setFields(schemaResponse.data.fields); // Set Fields

        // Get Collection Items
        const itemResponse = await axiosInstance.get(
          `/collections/${collection}/items`
        );
        setItems(itemResponse.data); // Set Items
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, [collection, collectionDetails]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper
      sx={{
        padding: 2,
      }}
    >
      <Typography variant="h6" component="h2" sx={{ margin: 2 }}>
        Items List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="items table">
          <TableHead>
            <TableRow>
              {fields.map((field) => (
                <TableCell key={field.displayName}>
                  {field.displayName}
                </TableCell>
              ))}
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                {fields.map((field) => {
                  if (field.type === "Image" && item.fieldData[field.slug]) {
                    const { url, alt } = item.fieldData[field.slug];
                    return (
                      <TableCell key={field.displayName}>
                        <img
                          src={url}
                          alt={alt || "image"}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={field.displayName}>
                        {item.fieldData[field.slug]}
                      </TableCell>
                    );
                  }
                })}
                <TableCell>{item.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ItemsList;
