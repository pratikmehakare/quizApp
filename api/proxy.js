//for vercel deployement
export default async function handler(req, res) {
    const apiUrl = 'https://api.jsonserve.com/Uw5CrX'; 
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch data' });
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  