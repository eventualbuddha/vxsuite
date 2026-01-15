import { z } from 'zod/v4';

export interface Point {
  x: number;
  y: number;
}
export const PointSchema: z.ZodSchema<Point> = z.object({
  x: z.number(),
  y: z.number(),
});

export interface Offset {
  x: number;
  y: number;
}
export const OffsetSchema: z.ZodSchema<Offset> = z.object({
  x: z.number(),
  y: z.number(),
});

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
export const RectSchema: z.ZodSchema<Rect> = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});

export interface Outset<T extends number = number> {
  top: T;
  right: T;
  bottom: T;
  left: T;
}

export const OutsetSchema: z.ZodSchema<Outset> = z.object({
  top: z.number(),
  right: z.number(),
  bottom: z.number(),
  left: z.number(),
});

export type Corners = [
  topLeft: Point,
  topRight: Point,
  bottomLeft: Point,
  bottomRight: Point,
];
export const CornersSchema: z.ZodSchema<Corners> = z.tuple([
  PointSchema,
  PointSchema,
  PointSchema,
  PointSchema,
]);

export interface Size {
  width: number;
  height: number;
}
export const SizeSchema: z.ZodSchema<Size> = z.object({
  width: z.number(),
  height: z.number(),
});
