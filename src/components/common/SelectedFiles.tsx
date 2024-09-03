import { Box, Paper, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import React from "react"


const SelectedFiles = (props: any) => {

    const { files, handleDeletedFiles } = props;

    return (
        <Box display="flex" flexDirection="column" width="80%">
            <div className="pdf-container">
                <Typography padding='5px' sx={{borderBottom: '1px solid #d8d5d1'}} marginTop={1} textAlign='center' variant="h4" gutterBottom>
                    Selected Files
                </Typography>
                {files && files?.map((data: any, index: number) => {
                    return (
                        <Paper
                            key={index}
                            sx={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                display: "flex",
                                padding: 2,
                                marginTop: 2,
                                gap: 3,
                            }}
                        >
                            <Stack direction={"row"} gap={2}>
                                <FileCopyIcon />
                                <Typography variant="h6">{data.name}</Typography>
                            </Stack>
                            <ClearIcon
                                onClick={() => handleDeletedFiles(index)}
                            />
                        </Paper>
                    );
                })}
            </div>
        </Box>
    )
}

export default SelectedFiles;