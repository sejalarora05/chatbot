import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import ReadMoreModal from "./ReadMoreModal";

interface VerticalCardListProps {
    items: { id: number; title: string; description: string }[];
}

const VerticalCardList: React.FC<VerticalCardListProps> = ({ items }) => {
    const [openReadMoreModal, setOpenReadMoreModal] = useState(false);
    const [title , setTitle] = useState('');
    const [desc , setDesc] = useState('')

    const handleInstructionModal = (item:any) => {
        setTitle(item?.title)
        setDesc(item?.description)
        setOpenReadMoreModal(!openReadMoreModal)
    }
    return (
        <Grid
            item
            xs={12}
            lg={3}
            sx={{
                padding: 2,
                height: "88.5vh",
                overflowY: "auto",
                borderRadius: '8px',
                bgcolor: '#FFFFFF',
                "&::-webkit-scrollbar": {
                    display: "none", // Hide the scrollbar
                },
            }}
        >
            <Typography variant="h6" fontWeight={'600'} sx={{ marginBottom: 2, color: '#222222', fontSize: '18px' }}>Case Studies</Typography>
            {items.map((item) => (
                <Card key={item.id}
                    sx={{
                        marginBottom: "10px",
                        borderRadius: '15px',
                        height: '170px',
                        padding: '5px',
                        gap: '10px',
                        bgcolor: '#F7F7F7'
                    }}>
                    <CardContent>
                        <Typography variant="body1" fontWeight={'500'}>{item.title}</Typography>
                        <Typography variant="body2" sx={{ overflow: 'hidden', overflowY: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                            {item.description}
                        </Typography>
                        <Button onClick={()=>{handleInstructionModal(item)}} variant="text" sx={{ color: '#EE851E !important', marginLeft: -1, textDecoration: 'underline !important' }}>READ MORE</Button>
                    </CardContent>
                </Card>
            ))}
             {openReadMoreModal && title!='' && <ReadMoreModal openReadMoreModal={openReadMoreModal} handleInstructionModal={handleInstructionModal} title={title} desc={desc} /> }
        </Grid>
    );
};

export default VerticalCardList;
