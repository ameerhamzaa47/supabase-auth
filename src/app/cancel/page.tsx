'use client'
import { useRouter } from 'next/navigation';

const CancelPage = () => {
  const router = useRouter();

  return (
    <div style={{
      maxWidth: '600px',
      margin: '80px auto',
      padding: '40px',
      background: '#fff5f5',
      border: '1px solid #fed7d7',
      borderRadius: '12px',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '28px', color: '#c53030' }}>❌ Payment Cancelled</h1>
      <p style={{ marginTop: '20px', fontSize: '18px', color: '#742a2a' }}>
        You cancelled the payment. No money was taken.
      </p>
      <button
        style={{
          marginTop: '32px',
          padding: '12px 32px',
          fontSize: '16px',
          background: '#38b2ac',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
        onClick={() => router.push('/checkout')}
      >
        Back to Checkout
      </button>
    </div>
  );
};

export default CancelPage;
