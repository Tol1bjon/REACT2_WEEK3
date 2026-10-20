import { useEffect, useState } from 'react';
import { ZustandData } from './Store/Zustand';
import { useAtom, useSetAtom } from 'jotai/react';
import { atomData, deleteAtom } from './Store/Jotai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRedux, getRedux } from './Store/Redux';
import { ZUSTAND_API, JOTAI_API, REDUX_API } from './API/API';
import axios from 'axios';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
  CircularProgress,
  Stack,
  Divider,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import {
  Mail,
  Briefcase,
  MapPin,
  Trash2,
  Calendar,
  Search,
  Plus,
  Edit2,
  Eye,
} from 'lucide-react';
import Delete from './Components/Delete';
import ProfileDrawer from './Components/ProfileDrawer';
import UserModal from './Components/UserModal';

const App = () => {
  const { data, get, loading } = ZustandData();
  const [dataJ, refreshAtomData] = useAtom(atomData);
  const { dataR } = useSelector((state: any) => state.data);
  const dispatch = useDispatch<any>();
  const deleteZus = ZustandData((state: any) => state.deleteZ);
  const delAtom = useSetAtom(deleteAtom);

  // Состояния
  const [del, setDel] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [profileUser, setProfileUser] = useState<any>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);

  useEffect(() => {
    get();
    dispatch(getRedux());
  }, []);

  // Объединяем данные из 3-х источников по ID
  const allUsers =
    data?.map((user: any) => {
      const user2 = dataJ?.find((j: any) => String(j.id) === String(user.id));
      const user3 = dataR?.find((r: any) => String(r.id) === String(user.id));
      if (!user2 || !user3) return null;
      return {
        id: user.id,
        name: user3.name,
        avatar: user3.avatar,
        email: user.email,
        job: user.job,
        age: user.age,
        city: user2.city,
        status: user2.status,
        createdAt: user.createdAt,
      };
    }).filter(Boolean) || [];

  // Фильтрация (Поиск + Селект Статус)
  const filteredUsers = allUsers.filter((u: any) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.job?.toLowerCase().includes(q) ||
      u.city?.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && Boolean(u.status)) ||
      (statusFilter === 'inactive' && !Boolean(u.status));

    return matchesSearch && matchesStatus;
  });

  // Пагинация (по 6 карточек на страницу)
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Хэндлеры для поиска и селекта со сбросом на 1 страницу
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e: any) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  // Удаление пользователя из всех 3-х API
  const handleDelete = async () => {
    if (del) {
      try {
        await Promise.all([
          deleteZus(del),
          delAtom(del),
          dispatch(deleteRedux(del)),
        ]);
        setDel(null);
        if (profileUser && profileUser.id === del) {
          setProfileUser(null);
        }
      } catch (err) {
        console.error('Ошибка при удалении:', err);
      }
    }
  };

  // Добавление пользователя во все 3 API
  const handleAdd = async (formData: any) => {
    try {
      const resZ = await axios.post(ZUSTAND_API, {
        job: formData.job,
        email: formData.email,
        age: formData.age,
        createdAt: new Date().toISOString(),
      });
      const newId = resZ.data.id;

      await Promise.all([
        axios.post(JOTAI_API, {
          id: newId,
          city: formData.city,
          status: formData.status,
        }),
        axios.post(REDUX_API, {
          id: newId,
          name: formData.name,
          avatar: formData.avatar,
          createdAt: new Date().toISOString(),
        }),
      ]);

      // Обновляем сторы
      get();
      refreshAtomData();
      dispatch(getRedux());
    } catch (err) {
      console.error('Ошибка при добавлении:', err);
    }
  };

  // Редактирование пользователя во всех 3-х API
  const handleEdit = async (formData: any) => {
    if (!editUser) return;
    const id = editUser.id;
    try {
      await Promise.all([
        axios.put(`${ZUSTAND_API}/${id}`, {
          job: formData.job,
          email: formData.email,
          age: formData.age,
        }),
        axios.put(`${JOTAI_API}/${id}`, {
          city: formData.city,
          status: formData.status,
        }),
        axios.put(`${REDUX_API}/${id}`, {
          name: formData.name,
          avatar: formData.avatar,
        }),
      ]);

      get();
      refreshAtomData();
      dispatch(getRedux());

      // Если открыт профиль этого пользователя, обновляем его данные
      if (profileUser && profileUser.id === id) {
        setProfileUser({ ...profileUser, ...formData });
      }
    } catch (err) {
      console.error('Ошибка при редактировании:', err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Заголовок */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Список пользователей
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Сводные данные из Zustand, Jotai и Redux
        </Typography>
      </Box>

      {/* Верхняя панель: Search, Select Status, Add */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          mb: 4,
          p: 2,
          backgroundColor: '#fff',
          borderRadius: 3,
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <Box sx={{ display: 'flex', flex: 1, gap: 2, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Поиск по имени, email, должности..."
            value={search}
            onChange={handleSearchChange}
            sx={{ minWidth: { xs: '100%', sm: 280 }, flex: { sm: 1 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="status-select-label">Select Status</InputLabel>
            <Select
              labelId="status-select-label"
              label="Select Status"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => setOpenAdd(true)}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1,
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.25)',
          }}
        >
          Add
        </Button>
      </Box>

      {/* Индикатор загрузки */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Если список пуст */}
      {!loading && paginatedUsers.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Пользователи не найдены
          </Typography>
        </Box>
      )}

      {/* Сетка карточек */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {paginatedUsers.map((user: any) => (
          <Card
            key={user.id}
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Шапка карточки */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{ width: 56, height: 56, boxShadow: 1 }}
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{ fontWeight: 700, fontSize: '1.1rem' }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <Briefcase size={14} />
                    {user.job}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Chip
                  label={user.status ? 'ACTIVE' : 'INACTIVE'}
                  color={user.status ? 'success' : 'default'}
                  size="small"
                  sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                />
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* Данные пользователя */}
              <Stack spacing={1}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Mail size={16} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.email}
                  </span>
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <MapPin size={16} />
                  {user.city}
                </Typography>

                {user.age && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Calendar size={16} />
                    {user.age} лет
                  </Typography>
                )}
              </Stack>
            </CardContent>

            {/* Кнопки действий: View Profile, Edit, Delete */}
            <Box sx={{ p: 2, pt: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<Eye size={16} />}
                onClick={() => setProfileUser(user)}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                View Profile
              </Button>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Edit2 size={16} />}
                  onClick={() => setEditUser(user)}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<Trash2 size={16} />}
                  onClick={() => setDel(user.id)}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  DELETE
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Пагинация */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, p) => setPage(p)}
            color="primary"
            shape="rounded"
            size="large"
          />
        </Box>
      )}

      {/* Боковая панель профиля (справа) */}
      <ProfileDrawer
        user={profileUser}
        open={Boolean(profileUser)}
        onClose={() => setProfileUser(null)}
        onEdit={(u) => setEditUser(u)}
        onDelete={(id) => setDel(id)}
      />

      {/* Модальное окно добавления */}
      <UserModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleAdd}
      />

      {/* Модальное окно редактирования */}
      <UserModal
        open={Boolean(editUser)}
        onClose={() => setEditUser(null)}
        onSave={handleEdit}
        initialData={editUser}
      />

      {/* Модальное окно подтверждения удаления */}
      <Delete
        open={Boolean(del)}
        onClose={() => setDel(null)}
        delUser={handleDelete}
      />
    </Container>
  );
};

export default App;
