import React, { useState } from 'react';

function VerifyCredential() {
  const [credentialID, setCredentialID] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  const handleVerifyCredential = async () => {
    try {
      const response = await fetch(`http://localhost:5000/verify-credential/${credentialID}`);
      if (!response.ok) {
        throw new Error('Error verifying credential');
      }
      const data = await response.json();
      setVerificationStatus(data.verification_status || 'No status found');
    } catch (error) {
      setVerificationStatus('Failed to verify credential');
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Verify Academic Credential</h2>
      <label>Credential ID</label>
      <input 
        type="text" 
        value={credentialID} 
        onChange={(e) => setCredentialID(e.target.value)} 
        placeholder="Enter credential ID to verify" 
      />
      <button onClick={handleVerifyCredential}>Verify Credential</button>
      <p>{verificationStatus}</p>
    </div>
  );
}

export default VerifyCredential;
