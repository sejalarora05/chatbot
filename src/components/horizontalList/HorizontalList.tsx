import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

interface Item {
  id: number;
  text: string;
}

interface HorizontalListProps {
  items: Item[];
}

const HorizontalList: React.FC<HorizontalListProps> = ({ items }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 2,
      bgcolor: '#222222',
      borderRadius: "8px",
      marginBottom: 2,
      overflow: 'hidden', // Ensure container handles overflow
    }}>
      <Typography sx={{ marginRight: '2px', color: '#FFFFFF', fontSize: '13px', width: '520px' }}>
        Applicable Use Cases
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        "&::-webkit-scrollbar": {
          display: "none", // Hide the scrollbar
        },
      }}>
        <List sx={{ display: 'flex', padding: 1 }}>
          {items.map((item) => (
            <ListItem key={item.id} sx={{ display: 'flex', borderRadius: '5px', bgcolor: '#3D3D3D', marginLeft: 2 }}>
              <ListItemText sx={{ color: 'white' }} primary={
                <Typography sx={{ fontSize: '12px' }}>
                  {item.text}
                </Typography>
              } />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default HorizontalList;
