import React, { useState } from 'react';

export default function GlobalDPPPortal() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const uploadFile = async (e: any) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    // This connects to the FastAPI backend you just built
    const response = await fetch('http://localhost:8000/ingest', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#4ade80' }}>IBM Global DPP Infrastructure</h1>
      <p style={{ color: '#94a3b8' }}>Automated EU 2026 Compliance Engine</p>
      
      <div style={{ border: '2px dashed #334155', padding: '50px', borderRadius: '20px', textAlign: 'center', marginTop: '40px' }}>
        <input type="file" onChange={uploadFile} style={{ marginBottom: '20px' }} />
        <p>{loading ? "AI Analyzing Materials..." : "Upload Supplier PDF or Invoice"}</p>
      </div>

      {result && (
        <div style={{ marginTop: '30px', background: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #4ade80' }}>
          <h3 style={{ color: '#4ade80' }}>Verification Successful</h3>
          <p><strong>GS1 Digital Link:</strong> {result.gs1_url}</p>
          <p><strong>Security Signature:</strong> {result.signature}</p>
          <hr style={{ borderColor: '#334155' }} />
          <p><strong>Product:</strong> {result.passport.product_name}</p>
        </div>
      )}
    </div>
  );
}
