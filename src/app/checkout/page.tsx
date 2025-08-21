'use client'
import { useState } from "react";
import { set } from "react-hook-form";

const page = () => {
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePayment = async () => {
        if (amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            const data = await res.json();

            if (data?.url) {
                window.location.href = data.url;
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: '500px',
            margin: '40px auto',
            padding: '32px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
        }}>
            <h1 style={{ textAlign: 'center', color: '#2d3748', marginBottom: '16px' }}>Checkout Page</h1>
            <p style={{ textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                Please review your order details below:
            </p>
            <input
                type='number'
                placeholder='Enter your amount'
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '16px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '6px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    textAlign: 'right'
                }}
            />
            <button
                style={{
                    width: '100%',
                    padding: '12px',
                    background: loading ? '#ccc' : '#3182ce',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginBottom: '20px',
                }}
                onClick={handlePayment}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
            <footer style={{ textAlign: 'center', color: '#718096', fontSize: '14px' }}>
                <p>Thank you for shopping with us!</p>
            </footer>
        </div>
    )
}

export default page
