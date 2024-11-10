// api.js
export const api = {
  subscription: {
    async subscribe(email) {
      try {
        const response = await fetch(
          'https://your-energy.b.goit.study/api/subscription',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          }
        );

        return await response.json(); 
      } catch (error) {
        console.error('Error during subscription request:', error);
        throw error; 
      }
    },
  },
};
