




const refreshAccessToken = async () => {
    const refreshToken = 'YOUR_REFRESH_TOKEN';  // Replace with your actual refresh token
  
    try {
      const refreshResponse = await fetch('/api/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
  
      if (refreshResponse.ok) {
        const { accessToken } = await refreshResponse.json();
        // Update the access token in your application state or wherever you store it
      //  setAccessToken(accessToken);
        // Retry the original API request with the new access token
     //   await fetchUserData();
      } else {
        console.error('Failed to refresh access token');
        // Handle refresh token failure, e.g., redirect to login
      }
    } catch (error) {
      console.error('Refresh error:', error);
    }
  };