import React, { useEffect } from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import InputField from '../../shared/InputField';
import { toast } from 'react-hot-toast';

interface EditCalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
    calendarId: string;
}

interface EditCalendarFormData {
    name: string;
    description: string;
}

const editCalendarSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name must be at most 100 characters long.',
        'any.required': 'Name is required.',
    }),
    description: Joi.string().max(500).allow('', null).messages({
        'string.max': 'Description must be at most 500 characters long.',
    }),
});

const EditCalendarModal: React.FC<EditCalendarModalProps> = ({ isOpen, onClose, calendarId }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EditCalendarFormData>({
        resolver: joiResolver(editCalendarSchema),
    });

    useEffect(() => {
        if (isOpen) {
            // Set default values using fake data
            reset({
                name: 'Sample Calendar',
                description: 'This is a sample calendar description.',
            });
        }
    }, [isOpen, reset]);

    const onSubmit = async (data: EditCalendarFormData) => {
        const loadingId = toast.loading('Updating calendar...');
        try {
            // Simulate updating a calendar
            setTimeout(() => {
                toast.dismiss(loadingId);
                toast.success('Calendar updated successfully');
                reset();
                onClose();
            }, 1000);
        } catch {
            toast.dismiss(loadingId);
            toast.error('Failed to update calendar');
        }
    };

    const handleRemoveCalendar = async () => {
        const loadingId = toast.loading('Removing calendar...');
        try {
            // Simulate removing a calendar
            setTimeout(() => {
                toast.dismiss(loadingId);
                toast.success('Calendar removed successfully');
                reset();
                onClose();
            }, 1000);
        } catch {
            toast.dismiss(loadingId);
            toast.error('Failed to remove calendar');
        }
    };

    return (
      <Modal open={isOpen} onClose={onClose}>
          <Box className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Box className="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md">
                  <Box className="flex justify-between items-center mb-6">
                      <Typography variant="h6" className="text-2xl font-bold dark:text-white">Edit Calendar</Typography>
                      <IconButton onClick={onClose}
                                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                          <X className="w-5 h-5" />
                      </IconButton>
                  </Box>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <InputField
                        type="text"
                        label="Name"
                        register={register('name')}
                        error={errors.name?.message}
                        placeholder="Enter calendar name"
                      />
                      <InputField
                        type="text"
                        label="Description"
                        register={register('description')}
                        error={errors.description?.message}
                        placeholder="Enter calendar description"
                      />
                      <Box className="flex justify-end space-x-3">
                          <Button type="submit" variant="contained" color="primary" className="w-full">
                              Update Calendar
                          </Button>
                      </Box>
                  </form>
              </Box>
          </Box>
      </Modal>
    );
};

export default EditCalendarModal;
