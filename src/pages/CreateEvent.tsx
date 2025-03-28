import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import InputField from '../shared/InputField';
import CalendarService from '../services/CalendarService';
import { toast } from 'react-hot-toast';
import { EventRecurrence, EventType } from '../types/event';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarType } from '../types/calendar';

interface EventFormData {
    title: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    type: EventType;
    recurrence: EventRecurrence;
}

const eventSchema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
        'string.min': 'Title must be at least 3 characters long.',
        'string.max': 'Title must be at most 100 characters long.',
        'any.required': 'Title is required.'
    }),
    description: Joi.string().max(500).allow('', null).messages({
        'string.max': 'Description must be at most 500 characters long.'
    }),
    startDateTime: Joi.string().required().messages({
        'any.required': 'Start date and time is required.'
    }),
    endDateTime: Joi.string().required().messages({
        'any.required': 'End date and time is required.'
    }),
    type: Joi.string().valid('arrangement', 'reminder', 'task').required().messages({
        'any.only': 'Type must be one of: arrangement, reminder, task.'
    }),
    recurrence: Joi.string().valid('none', 'daily', 'weekly', 'monthly', 'yearly').required().messages({
        'any.only': 'Recurrence must be one of: none, daily, weekly, monthly, yearly.'
    }),
});

const CreateEvent: React.FC = () => {
    const navigate = useNavigate();
    const [calendars, setCalendars] = useState<CalendarType[]>([]);
    const [selectedCalendar, setSelectedCalendar] = useState<CalendarType | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<EventFormData>({
        resolver: joiResolver(eventSchema),
        defaultValues: {
            type: EventType.Arrangement,
            recurrence: EventRecurrence.None,
            startDateTime: '',
            endDateTime: ''
        }
    });

    const eventType = watch('type');
    const recurrence = watch('recurrence');

    useEffect(() => {
        const fetchCalendars = async () => {
            try {
                const response = await CalendarService.getMyCalendars();
                const calendars = response.map((calendar) => ({
                    ...calendar.calendar,
                }));
                setCalendars(calendars);
                if (calendars.length > 0) {
                    setSelectedCalendar(calendars[0]);
                }
            } catch (error) {
                console.error('Failed to fetch user calendars', error);
                toast.error('Failed to fetch calendars');
            }
        };

        fetchCalendars();
    }, []);

    const onSubmit = async (data: EventFormData) => {
        if (!selectedCalendar) {
            toast.error('Please select a calendar');
            return;
        }
        try {
            const eventData: any = {
                title: data.title,
                description: data.description,
                startTime: new Date(data.startDateTime).toISOString(),
                endTime: new Date(data.endDateTime).toISOString(),
                type: data.type,
                recurrence: data.recurrence,
            }
            console.log('selectedcalendar id: ' + selectedCalendar.id + ' eventData: ' + eventData.title + ' ' + eventData.description + ' ' + eventData.startTime + ' ' + eventData.endTime + ' ' + eventData.type + ' ' + eventData.recurrence);
            await CalendarService.createEvent(selectedCalendar.id, eventData);
            toast.success('Event created successfully');
        } catch (error) {
            console.error('Failed to create event', error);
            toast.error('Failed to create event');
        }
    };

    return (
      <div className="container mx-auto p-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md mx-auto">
              <div className="flex justify-center items-center mb-6">
                  <h2 className="text-2xl font-bold dark:text-white">Add New Event</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <InputField
                    type="text"
                    label="Title"
                    register={register('title')}
                    error={errors.title?.message}
                    placeholder="Enter event title"
                  />
                  <InputField
                    type="text"
                    label="Description"
                    register={register('description')}
                    error={errors.description?.message}
                    placeholder="Enter event description"
                  />
                  <div className="grid grid-cols-1 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Start Date & Time
                          </label>
                          <div className="relative">
                              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                              <input
                                type="datetime-local"
                                {...register('startDateTime')}
                                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              />
                              {errors.startDateTime && (
                                <p className="mt-1 text-sm text-red-600">{errors.startDateTime.message}</p>
                              )}
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              End Date & Time
                          </label>
                          <div className="relative">
                              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                              <input
                                type="datetime-local"
                                {...register('endDateTime')}
                                className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              />
                              {errors.endDateTime && (
                                <p className="mt-1 text-sm text-red-600">{errors.endDateTime.message}</p>
                              )}
                          </div>
                      </div>
                  </div>
                  <div className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Event Type
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                              {Object.values(EventType).map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setValue('type', type)}
                                  className={`py-2 px-4 rounded-lg text-sm font-medium capitalize transition-colors ${eventType === type
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                  }`}
                                >
                                    {type.toLowerCase()}
                                </button>
                              ))}
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Recurrence
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                              {Object.values(EventRecurrence).map((rec) => (
                                <button
                                  key={rec}
                                  type="button"
                                  onClick={() => setValue('recurrence', rec)}
                                  className={`py-2 px-4 rounded-lg text-sm font-medium capitalize transition-colors ${recurrence === rec
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                  }`}
                                >
                                    {rec.toLowerCase()}
                                </button>
                              ))}
                          </div>
                      </div>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Select Calendar
                      </label>
                      <div className="relative">
                          <select
                            value={selectedCalendar?.id || ''}
                            onChange={(e) => {
                                const calendar = calendars.find(cal => cal.id === e.target.value);
                                setSelectedCalendar(calendar || null);
                            }}
                            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 dark:text-white"
                          >
                              {calendars.map((calendar) => (
                                <option key={calendar.id} value={calendar.id}>
                                    {calendar.title}
                                </option>
                              ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                              <Calendar className="w-4 h-4" />
                          </div>
                      </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-6">
                      <button
                        type="button"
                        onClick={() => navigate('/calendar')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                          Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                          Create Event
                      </button>
                  </div>
              </form>
          </div>
      </div>
    );
};

export default CreateEvent;
