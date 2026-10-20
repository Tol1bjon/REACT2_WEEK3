import {
  Drawer,
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Divider,
  Stack,
  Button,
} from '@mui/material';
import {
  X,
  Mail,
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  Edit2,
  Trash2,
} from 'lucide-react';

interface ProfileDrawerProps {
  user: any;
  open: boolean;
  onClose: () => void;
  onEdit: (user: any) => void;
  onDelete: (id: any) => void;
}

const ProfileDrawer = ({ user, open, onClose, onEdit, onDelete }: ProfileDrawerProps) => {
  if (!user) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 420 },
            p: 3,
            boxSizing: 'border-box',
          },
        },
      }}
    >
      {/* Шапка Drawer */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Профиль пользователя
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ borderRadius: 2 }}>
          <X size={20} />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Основная инфа: аватар, имя, должность, статус */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{
            width: 96,
            height: 96,
            mx: 'auto',
            mb: 2,
            boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
            border: '3px solid #fff',
          }}
        />
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          {user.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            mb: 1.5,
          }}
        >
          <Briefcase size={15} />
          {user.job}
        </Typography>
        <Chip
          label={user.status ? 'ACTIVE' : 'INACTIVE'}
          color={user.status ? 'success' : 'default'}
          size="small"
          sx={{ fontWeight: 600, px: 1 }}
        />
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Детальная информация */}
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          mb: 2,
          fontWeight: 700,
          fontSize: '0.75rem',
        }}
      >
        Контактные данные
      </Typography>

      <Stack spacing={2} sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'action.hover', display: 'flex' }}>
            <Mail size={18} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {user.email}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'action.hover', display: 'flex' }}>
            <MapPin size={18} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Город
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {user.city}
            </Typography>
          </Box>
        </Box>

        {user.age && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'action.hover', display: 'flex' }}>
              <Calendar size={18} />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Возраст
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {user.age} лет
              </Typography>
            </Box>
          </Box>
        )}

        {user.createdAt && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'action.hover', display: 'flex' }}>
              <Clock size={18} />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Дата регистрации
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        )}
      </Stack>

      {/* Быстрые действия внизу */}
      <Box sx={{ mt: 'auto', pt: 2, display: 'flex', gap: 1.5 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Edit2 size={16} />}
          onClick={() => {
            onClose();
            onEdit(user);
          }}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, py: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          fullWidth
          startIcon={<Trash2 size={16} />}
          onClick={() => {
            onClose();
            onDelete(user.id);
          }}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, py: 1 }}
        >
          Delete
        </Button>
      </Box>
    </Drawer>
  );
};

export default ProfileDrawer;
