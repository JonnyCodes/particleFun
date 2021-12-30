import { Point, Rectangle } from "@pixi/math";

export const randomBetween = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

export const randomIntBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomPointWithin = (rectangle: Rectangle) => {
    return new Point(randomBetween(rectangle.x, rectangle.width), randomBetween(rectangle.y, rectangle.height));
}