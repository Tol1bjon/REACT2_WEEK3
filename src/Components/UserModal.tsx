import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Stack,
} from '@mui/material';

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void> | void;
  initialData?: any;
}

const defaultAvatar = 'https://avatars.githubusercontent.com/u/22380373';

const UserModal = ({ open, onClose, onSave, initialData }: UserModalProps) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    job: '',
    city: '',
    age: '',
    avatar: defaultAvatar,
    status: true,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        email: initialData.email || '',
        job: initialData.job || '',
        city: initialData.city || '',
        age: initialData.age || '',
        avatar: initialData.avatar || defaultAvatar,
        status: Boolean(initialData.status),
      });
    } else {
      setForm({
        name: '',
        email: '',
        job: '',
        city: '',
        age: '',
        avatar: defaultAvatar,
        status: true,
      });
    }
  }, [initialData, open]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const isEdit = Boolean(initialData);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: { borderRadius: 3, p: 1 },
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          {isEdit ? 'Редактировать пользователя' : 'Добавить нового пользователя'}
        </DialogTitle>

        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2.5 }}>
          {/* Avatar Preview */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={form.avatar} sx={{ width: 64, height: 64, boxShadow: 1 }} />
            <TextField
              size="small"
              label="URL Аватара"
              fullWidth
              value={form.avatar}
              onChange={(e) => handleChange('avatar', e.target.value)}
            />
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              required
              size="small"
              label="Имя"
              fullWidth
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <TextField
              required
              size="small"
              type="email"
              label="Email"
              fullWidth
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              required
              size="small"
              label="Должность (Job)"
              fullWidth
              value={form.job}
              onChange={(e) => handleChange('job', e.target.value)}
            />
            <TextField
              required
              size="small"
              label="Город (City)"
              fullWidth
              value={form.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              size="small"
              type="number"
              label="Возраст"
              fullWidth
              value={form.age}
              onChange={(e) => handleChange('age', e.target.value)}
            />
            <FormControl size="small" fullWidth>
              <InputLabel id="status-modal-label">Статус</InputLabel>
              <Select
                labelId="status-modal-label"
                label="Статус"
                value={form.status ? 'active' : 'inactive'}
                onChange={(e) => handleChange('status', e.target.value === 'active')}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            disabled={submitting}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 3 }}
          >
            {submitting ? 'Сохранение...' : isEdit ? 'Сохранить изменения' : 'Добавить'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserModal;
