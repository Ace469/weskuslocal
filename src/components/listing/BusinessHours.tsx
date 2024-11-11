import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Clock } from 'lucide-react';

interface BusinessHour {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const BusinessHours: React.FC = () => {
  const { register, watch } = useFormContext();
  const businessHours = watch('businessHours');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-900">Business Hours</h2>
      </div>

      <div className="space-y-4">
        {days.map((day, index) => (
          <div key={day} className="flex items-center gap-4">
            <div className="w-32">
              <span className="text-sm font-medium text-gray-700">{day}</span>
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register(`businessHours.${index}.isClosed`)}
                className="rounded text-indigo-600"
              />
              <span className="text-sm text-gray-600">Closed</span>
            </label>

            {!businessHours?.[index]?.isClosed && (
              <>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    {...register(`businessHours.${index}.open`)}
                    className="px-3 py-1 border rounded-lg text-sm"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    {...register(`businessHours.${index}.close`)}
                    className="px-3 py-1 border rounded-lg text-sm"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};