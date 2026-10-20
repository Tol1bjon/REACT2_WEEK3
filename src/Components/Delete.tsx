import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { Trash2 } from 'lucide-react';

const Delete = ({ delUser, open = false, onClose }: any) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 1,
            maxWidth: 400,
            width: '100%',
          },
        },
      }}
    >
      <DialogContent sx={{ textAlign: 'center', pt: 3 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <Trash2 size={28} />
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Удалить пользователя?
        </Typography>

        <DialogContentText sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
          Вы уверены, что хотите удалить этого пользователя? Это действие нельзя будет отменить.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            borderColor: 'rgba(0,0,0,0.15)',
            color: 'text.primary',
          }}
        >
          Отмена
        </Button>
        <Button
          onClick={delUser}
          variant="contained"
          color="error"
          fullWidth
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Delete;
