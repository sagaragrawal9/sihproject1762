import React from 'react';

const Community = () => {
  return (
    <div className="community">
      <h2>Community Page</h2>

      {/* Large text message */}
      <p style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginTop: '2rem' }}>
        The community page will be integrated here soon. Stay tuned!
      </p>

      {/* Adding meaningful content */}
      <div style={{ padding: '2rem', background: '#f9f9f9' }}>
        <h3 style={{ fontSize: '1.8rem', marginTop: '1.5rem' }}>Our Vision</h3>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8rem', textAlign: 'justify' }}>
          The community page will be a central place where users can connect, share their collections,
          and engage in meaningful discussions about philately. We aim to provide resources, host discussions,
          and enable users to trade or sell their philatelic items securely. Stay tuned for exciting updates
          as we bring this platform to life!
        </p>

        {/* Image placeholder */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <img 
            src="https://via.placeholder.com/600x300" 
            alt="Community Placeholder" 
            style={{ width: '100%', maxWidth: '600px', height: 'auto', borderRadius: '10px' }}
          />
          <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>A glimpse of the community platform coming soon.</p>
        </div>

        <h3 style={{ fontSize: '1.8rem', marginTop: '2.5rem' }}>Join the Conversation</h3>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8rem', textAlign: 'justify' }}>
          We believe that collectors should have a dedicated space to share their experiences and 
          knowledge. Our community forum will allow users to ask questions, seek advice, and contribute 
          to building a stronger community around philately.
        </p>

        {/* Another Image Placeholder */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <img 
            src="https://via.placeholder.com/600x300" 
            alt="Discussion Placeholder" 
            style={{ width: '100%', maxWidth: '600px', height: 'auto', borderRadius: '10px' }}
          />
          <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>A preview of how discussions will look on the platform.</p>
        </div>
      </div>
    </div>
  );
};

export default Community;