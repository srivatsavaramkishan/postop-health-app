import React from 'react';
export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
      <p>This app helps track post-op recovery using real-time data, EHRs, wearable devices, and analytics dashboards.</p>
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Power BI Dashboard:</h3>
        <iframe
          title="Power BI"
          width="100%"
          height="450"
          src="https://app.powerbi.com/view?r=YOUR_EMBED_URL_HERE"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
