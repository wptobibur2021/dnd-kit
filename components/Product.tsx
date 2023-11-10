import React from "react";
import { ProductType } from "..";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Product = ({
  product,
  index,
}: {
  product: ProductType;
  index: number;
}) => {
  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        gridRowStart: `${index === 0 ? "span 2 " : "span 1"}`,
        gridColumnStart: `${index === 0 ? "span 2" : "span 1"}`,
        transformOrigin: "0 0",
      }}
      className={`${isDragging && "z-50"}`}
    >
      <Image
        className="rounded-xl border border-slate-200 shadow-sm"
        src={product.src}
        alt="Image"
        width={350}
        height={250}
      />
    </div>
  );
};

export default Product;
