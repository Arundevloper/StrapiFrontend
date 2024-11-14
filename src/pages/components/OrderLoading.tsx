import React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';

interface SpinnerProps {
  type: LoadingType;
  color: string;
}

const OrderLoading: React.FC<SpinnerProps> = ({ type, color }) => (
  <div style={styles.overlay}>
    <div style={styles.loaderContainer}>
      <ReactLoading type={type} color={color} height={80} width={80} />
    </div>
  </div>
);

const styles = {
  overlay: {
    position: 'fixed' as 'fixed',  // Ensure the overlay covers the full viewport
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Semi-transparent background
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,  // High z-index to appear on top
  },
  loaderContainer: {
    textAlign: 'center',
    maxWidth: '80px',
    maxHeight: '80px',
    width: '100%', 
    height: '100%',
  },
};

export default OrderLoading;
