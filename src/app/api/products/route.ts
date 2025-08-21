import { NextResponse } from 'next/server';

// GET request handler
export async function GET() {
    return NextResponse.json(
        [
            {
                id: 1,
                name: "Laptop",
                price: 1200,
                inStock: true,
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8", // Unsplash laptop image
                description: "High-performance laptop suitable for work and gaming."
            },
            {
                id: 2,
                name: "Smartphone",
                price: 800,
                inStock: false,
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9", // Unsplash smartphone image
                description: "Latest model smartphone with advanced features."
            },
            {
                id: 3,
                name: "Headphones",
                price: 150,
                inStock: true,
                image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167", // Unsplash headphones image
                description: "Noise-cancelling headphones for immersive sound experience."
            }
        ]
    );
}
