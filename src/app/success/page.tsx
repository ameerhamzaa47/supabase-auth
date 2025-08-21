'use client'
import { useRouter } from 'next/navigation';

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div style={{
      maxWidth: '600px',
      margin: '80px auto',
      padding: '40px',
      background: '#e6fffa',
      border: '1px solid #b2f5ea',
      borderRadius: '12px',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '28px', color: '#2c7a7b' }}>🎉 Payment Successful!</h1>
      <p style={{ marginTop: '20px', fontSize: '18px', color: '#285e61' }}>
        Thank you for your payment. Your transaction has been processed successfully.
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

export default SuccessPage;
