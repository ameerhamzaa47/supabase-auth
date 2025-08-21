'use client'
import { useEffect, useState } from "react"

const page = () => {
    const [products, setProducts] = useState([])

    const getData = async () => {
        const res = await fetch('api/products')
        const resp = await (res).json()
        setProducts(resp)
        return resp
    }
    useEffect(()=>{
        getData()
    },[])
    return (
        <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem", background: "#f9f9f9", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>Products List</h1>
            {products.map((pro: any) => (
            <div
                key={pro.id}
                style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "1rem",
                marginBottom: "1.5rem",
                background: "#fff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.07)"
                }}
            >
                <img
                src={pro.imageUrl}
                alt={pro.name}
                style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginRight: "1.5rem",
                    border: "1px solid #eee"
                }}
                />
                <div>
                <p><strong>ID:</strong> {pro.id}</p>
                <p><strong>Name:</strong> {pro.name}</p>
                <p><strong>Price:</strong> ${pro.price}</p>
                <p><strong>Status:</strong> {pro.inStock ? "In Stock" : "Out of Stock"}</p>
                <p><strong>Description:</strong> {pro.description}</p>
                </div>
            </div>
            ))}
        </div>
    )
}

export default page
