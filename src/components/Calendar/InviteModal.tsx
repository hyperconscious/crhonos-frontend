import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { Mail, X, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import InputField from '../../shared/InputField';
import { toast } from 'react-hot-toast';

interface InviteModalProps {
    isOpen: boolean;
    onClose: () => void;
    calendarId: string;
}

interface InviteFormData {
    email: string;
}

const inviteSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Please enter a valid email address.',
        'any.required': 'Email is required.',
    }),
});

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, calendarId }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<InviteFormData>({
        resolver: joiResolver(inviteSchema),
    });
    const [existingUsers, setExistingUsers] = useState<string[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            // Use hardcoded data for now
            const users = ['user1@example.com', 'user2@example.com', 'user3@example.com', 'user3@example.com', 'user3@example.com', 'user3@example.com', 'user3@example.com', 'user3@example.com', 'user3@example.com', 'user3@example.com', 'user3@example.com', 'user3@example.com'];
            setExistingUsers(users);
        };

        if (isOpen) {
            fetchUsers();
        }
    }, [isOpen, calendarId]);

    const onSubmit = async (data: InviteFormData) => {
        const loadingId = toast.loading('Inviting user...');
        try {
            // Simulate inviting a user
            setTimeout(() => {
                toast.dismiss(loadingId);
                toast.success('User invited successfully');
                setExistingUsers((prevUsers) => [...prevUsers, data.email]);
                reset();
                onClose();
            }, 1000);
        } catch {
            toast.dismiss(loadingId);
            toast.error('Failed to invite user');
        }
    };

    const handleRemoveUser = (email: string) => {
        setExistingUsers((prevUsers) => prevUsers.filter((user) => user !== email));
    };

    return (
      <Modal open={isOpen} onClose={onClose}>
          <Box className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Box className="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md">
                  <Box className="flex justify-between items-center mb-6">
                      <Typography variant="h6" className="text-2xl font-bold dark:text-white">Invite Users</Typography>
                      <IconButton onClick={onClose}
                                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                          <X className="w-5 h-5" />
                      </IconButton>
                  </Box>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                      <InputField
                        type="email"
                        icon={<Mail />}
                        label="Email"
                        register={register('email')}
                        error={errors.email?.message}
                        placeholder="Enter user email"
                      />
                      <Button type="submit" variant="contained" color="primary"
                              style={{ textTransform: 'none' }}>
                          Invite
                      </Button>
                  </form>
                  <Box className="mt-6 pt-6">
                      <Typography variant="subtitle1" className="text-lg font-bold dark:text-white">Existing
                          Users</Typography>
                      <Box className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                          {existingUsers.map((user, index) => (
                            <Box key={index}
                                 className="flex justify-between items-center text-gray-700 dark:text-gray-300 pe-6">
                                <span>{user}</span>
                                <IconButton onClick={() => handleRemoveUser(user)}>
                                    <Trash className="w-5 h-5 text-red-700" />
                                </IconButton>
                            </Box>
                          ))}
                      </Box>
                  </Box>
              </Box>
          </Box>
      </Modal>
    );
};

export default InviteModal;
