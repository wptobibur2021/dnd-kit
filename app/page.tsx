"use client";

import ProductsData from "../data/products.json";
import { useState } from "react";
import Product from "@/components/Product";
import { ProductType } from "../index";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
export default function Home() {
  const [products, setProducts] = useState<ProductType[]>(ProductsData);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setProducts((items) => {
        const oldIndex = items.map((item) => item.id).indexOf(active.id);
        const newIndex = items.map((item) => item.id).indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  return (
    <div className="container m-40 ">
      <div className="bg-white rounded-lg m-auto">
        <div className="border-b border-neutral-300 px-10 pb-2 pt-5">
          <div>
            <h2>Products Gallery</h2>
          </div>
        </div>
        <div className="p-10">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={products}>
              <div className="grid grid-cols-8 gap-10">
                {products.map((product, index) => (
                  <Product product={product} key={product.id} index={index} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
