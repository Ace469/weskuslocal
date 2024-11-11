import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import type { CategoryConfig } from '../../../types/admin';

interface SortableCategoryProps {
  category: CategoryConfig;
  index: number;
  onChange: (index: number, field: keyof CategoryConfig, value: any) => void;
  onRemove: (index: number) => void;
}

const SortableCategory: React.FC<SortableCategoryProps> = ({
  category,
  index,
  onChange,
  onRemove,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
    >
      <div {...attributes} {...listeners}>
        <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-4">
        <input
          type="text"
          value={category.name}
          onChange={(e) => onChange(index, 'name', e.target.value)}
          className="px-3 py-2 border rounded"
          placeholder="Category name"
        />
        <input
          type="text"
          value={category.image}
          onChange={(e) => onChange(index, 'image', e.target.value)}
          className="px-3 py-2 border rounded"
          placeholder="Image URL"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={category.featured}
          onChange={(e) => onChange(index, 'featured', e.target.checked)}
          className="rounded text-indigo-600"
        />
        <span className="text-sm text-gray-600">Featured</span>
      </label>

      <button
        onClick={() => onRemove(index)}
        className="p-2 text-gray-400 hover:text-red-600"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

interface CategoryEditorProps {
  categories: CategoryConfig[];
  onChange: (categories: CategoryConfig[]) => void;
}

export const CategoryEditor: React.FC<CategoryEditorProps> = ({
  categories,
  onChange,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);
      onChange(arrayMove(categories, oldIndex, newIndex));
    }
  };

  const handleAdd = () => {
    onChange([
      ...categories,
      { id: Date.now().toString(), name: '', image: '', featured: false },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(categories.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof CategoryConfig, value: any) => {
    const newCategories = categories.map((category, i) =>
      i === index ? { ...category, [field]: value } : category
    );
    onChange(newCategories);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Featured Categories</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Category
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categories.map(cat => cat.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {categories.map((category, index) => (
              <SortableCategory
                key={category.id}
                category={category}
                index={index}
                onChange={handleChange}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};