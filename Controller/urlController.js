import URL from  '../Models/Url.js';
import shortid from  'shortid';

export const shortenURL = async (req, res) => {
  const { longUrl } = req.body;
  const shortUrl = shortid.generate();

  try {
    const url = new URL({ longUrl, shortUrl });
    await url.save();
    res.status(201).json(url);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const redirectURL = async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await URL.findOne({ shortUrl });
    if (!url) return res.status(404).json({ message: 'URL not found' });

    url.clicks++;
    await url.save();
    res.redirect(url.longUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Additional controller for URL statistics
