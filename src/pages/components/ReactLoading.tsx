import React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';

interface Spinner {
  type: LoadingType;
  color: string;
}

const Spinner: React.FC<Spinner> = ({ type, color }) => (
    <div className="flex items-center justify-center">
      <ReactLoading type={type} color={color} height={100} width={100} />
    </div>
  );
  

export default Spinner;
