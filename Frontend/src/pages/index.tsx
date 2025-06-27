import { useEffect, useState } from "react";
import { Plus, Minus, RotateCcw, Loader2, TrendingUp } from "lucide-react";
import 'tailwindcss';

export default function Home() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/counter`)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.value);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateCounter = async (newValue: number) => {
    setUpdating(true);
    try {
      const response = await fetch(`http://localhost:3000/api/counter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: newValue }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setCount(data.value);
      }
    } catch (error) {
      console.error('Failed to update counter:', error);
    } finally {
      setUpdating(false);
    }
  };

  const increment = () => updateCounter(count + 1);
  const decrement = () => updateCounter(count - 1);
  const reset = () => updateCounter(0);

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center' as const,
  };

  const headerIconStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    marginBottom: '16px',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '8px',
    margin: 0,
  };

  const subtitleStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '32px',
    margin: 0,
  };

  const counterDisplayStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '16px',
    backdropFilter: 'blur(8px)',
  };

  const counterNumberStyle = {
    fontSize: '64px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '8px',
    transition: 'transform 0.3s ease',
    margin: 0,
  };

  const counterLabelStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    margin: 0,
  };

  const buttonRowStyle = {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  };

  const buttonBaseStyle = {
    flex: 1,
    fontWeight: '600',
    padding: '16px 24px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '16px',
  };

  const decrementButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: updating ? 'rgba(239, 68, 68, 0.5)' : 'rgba(239, 68, 68, 0.8)',
    color: 'white',
    opacity: updating ? 0.5 : 1,
  };

  const incrementButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: updating ? 'rgba(34, 197, 94, 0.5)' : 'rgba(34, 197, 94, 0.8)',
    color: 'white',
    opacity: updating ? 0.5 : 1,
  };

  const resetButtonStyle = {
    ...buttonBaseStyle,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    marginBottom: '24px',
    opacity: updating ? 0.5 : 1,
  };

  const statusIndicatorStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    backgroundColor: updating 
      ? 'rgba(234, 179, 8, 0.2)' 
      : 'rgba(34, 197, 94, 0.2)',
    color: updating ? 'rgba(254, 240, 138, 1)' : 'rgba(187, 247, 208, 1)',
  };

  const statusDotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: updating ? '#facc15' : '#4ade80',
    animation: updating ? 'pulse 1s infinite' : 'none',
  };

  const loadingContainerStyle = {
    ...containerStyle,
    textAlign: 'center' as const,
  };

  const loadingSpinnerStyle = {
    position: 'relative' as const,
    marginBottom: '16px',
  };

  const loadingRingStyle = {
    width: '80px',
    height: '80px',
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto',
  };

  const loadingTextStyle = {
    color: 'white',
    fontSize: '20px',
    fontWeight: '500',
  };

  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <div>
          <div style={loadingSpinnerStyle}>
            <div style={loadingRingStyle}></div>
          </div>
          <p style={loadingTextStyle}>Đang tải...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Header */}
        <div>
          <div style={headerIconStyle}>
            <TrendingUp size={32} color="white" />
          </div>
          <h1 style={titleStyle}>Counter App</h1>
          <h1 style={titleStyle}>Counter App</h1>
          <h1 style={titleStyle}>Counter App</h1>
          <h1 style={titleStyle}>Counter App</h1>
          <h1 style={titleStyle}>Counter App</h1>
          <h1 style={titleStyle}>Counter App</h1>
          <p style={subtitleStyle}>Theo dõi và quản lý số đếm của bạn</p>
        </div>

        {/* Counter Display */}
        <div style={counterDisplayStyle}>
          <h2 style={counterNumberStyle}>
            {count.toLocaleString()}
          </h2>
          <p style={counterLabelStyle}>
            Giá trị hiện tại
          </p>
        </div>

        {/* Action Buttons */}
        <div>
          <div style={buttonRowStyle}>
            <button
              onClick={decrement}
              disabled={updating}
              style={decrementButtonStyle}
            >
              {updating ? (
                <Loader2 size={20} style={{animation: 'spin 1s linear infinite'}} />
              ) : (
                <Minus size={20} />
              )}
              Giảm
            </button>
            
            <button
              onClick={increment}
              disabled={updating}
              style={incrementButtonStyle}
            >
              {updating ? (
                <Loader2 size={20} style={{animation: 'spin 1s linear infinite'}} />
              ) : (
                <Plus size={20} />
              )}
              Tăng
            </button>
          </div>

          <button
            onClick={reset}
            disabled={updating}
            style={resetButtonStyle}
          >
            {updating ? (
              <Loader2 size={20} style={{animation: 'spin 1s linear infinite'}} />
            ) : (
              <RotateCcw size={20} />
            )}
            Đặt lại về 0
          </button>
        </div>

        {/* Status Indicator */}
        <div style={statusIndicatorStyle}>
          <div style={statusDotStyle}></div>
          {updating ? 'Đang cập nhật...' : 'Sẵn sàng'}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        
        button:disabled {
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
