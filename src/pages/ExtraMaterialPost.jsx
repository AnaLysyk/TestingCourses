import React from 'react';
import { motion } from 'framer-motion';
import ButtonBackToExtra from '../components/ui/ButtonBackToExtra';


const ExtraMaterialPost = () => {
  const posts = [
    {
      id: 1,
      title: '',
      image: 'https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL2luc3RhZ3JhbS5maGFuNS0xMS5mbmEuZmJjZG4ubmV0L3YvdDUxLjI4ODUtMTUvNTYxNzE2NjI1XzE4MDYyMjY3Mzc1NTMwNTk5XzIxNzk5MTg2NTcyOTY5OTk1Njhfbi5qcGc_c3RwPWRzdC1qcGdfZTE1X2ZyX3AxMDgweDEwODBfdHQ2Jl9uY19odD1pbnN0YWdyYW0uZmhhbjUtMTEuZm5hLmZiY2RuLm5ldCZfbmNfY2F0PTEwMyZfbmNfb2M9UTZjWjJRRzRaNjBIQzZFN0pTaGFnTFVMWlA4WkVIUEg3OUQ3ZThucTlIcm96VF96a0xoZElCNXJZTldyY1NhMXN2c3VQUlUmX25jX29oYz1heGIyT0dpTFMxVVE3a052d0VLdHRsYiZfbmNfZ2lkPVE2OVJvWXpndW1EeGg0TDBBY21CLVEmZWRtPUFQczE3Q1VCQUFBQSZjY2I9Ny01Jm9oPTAwX0FmZE9zU0VFOEwtYldudENlalJDVk9YN3ljWXFCWEVNb2pHMzJydzJKaXpzUmcmb2U9NjhFQ0ExNjYmX25jX3NpZD0xMGQxM2IiLCJmaWxlbmFtZSI6IlNuYXBJbnN0YS50b181NjE3MTY2MjVfMTgwNjIyNjczNzU1MzA1OTlfMjE3OTkxODY1NzI5Njk5OTU2OF9uLmpwZyIsIm5iZiI6MTc1OTk1MzM5NSwiZXhwIjoxNzU5OTU2OTk1LCJpYXQiOjE3NTk5NTMzOTV9.vOLVN0y391WxHsy6_FvqpGEWZUzNSKzGDJPn3uC_0rw',
      url: 'https://www.instagram.com/p/DPjwyz2jMxw/', // substitua pelo link real
    },
    {
      id: 2,
      title: '',
      image: 'https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS81NTk4Njg3NDFfMTgwNjIxMTQyMjg1MzA1OTlfNjY1MTQ2OTQ2NTQzMjA5OTQ4Ml9uLmpwZz9zdHA9ZHN0LWpwZ19lMzVfcDY0MHg2NDBfc2gwLjA4X3R0NiZlZmc9ZXlKMlpXNWpiMlJsWDNSaFp5STZJbWx0WVdkbFgzVnliR2RsYmk0eE5EUXdlREU0TURBdWMyUnlMbVk0TWpjNE55NWtaV1poZFd4MFgybHRZV2RsTG1NeUluMCZfbmNfaHQ9c2NvbnRlbnQtaGVsMy0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDMmX25jX29jPVE2Y1oyUUdGUzZPdHJxUkU3a04yZnJxRWxMX2YtMmxJNTRYaDhSNGR6VXlrQ2o1X09PMklQV2dPWHBvc1c3U2tTYmVIWS1mak1sVlFrUzJsbGxsWkxzOXlqaWVyJl9uY19vaGM9YTk2clJmNjlad0lRN2tOdndFYVBqZE4mX25jX2dpZD1JOGt1RnFRVmloQ1dualZ2VWs5M3JRJmVkbT1BTlRLSUlvQkFBQUEmY2NiPTctNSZvaD0wMF9BZmY2dHk3X0FxR25iYkxXNWUtT3hXbVdOZFBHSWhDWEZxdFdfNlJ6WmVZanVnJm9lPTY4RUM4MTU2Jl9uY19zaWQ9ZDg4NWEyIiwiZmlsZW5hbWUiOiJTbmFwSW5zdGEudG9fNTU5ODY4NzQxXzE4MDYyMTE0MjI4NTMwNTk5XzY2NTE0Njk0NjU0MzIwOTk0ODJfbi5qcGciLCJuYmYiOjE3NTk5NTMzNjEsImV4cCI6MTc1OTk1Njk2MSwiaWF0IjoxNzU5OTUzMzYxfQ.R0aXnM273z2vN5mwtkafhzgzRJOAPphRddeK6_POUC0',
      url: 'https://www.instagram.com/p/DPgmbUeE6YD/?img_index=1',
    },
    {
      id: 3,
      title: '',
      image: 'https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS81NjA0MjgwNDNfMTgwNjIyNzA4NzM1MzA1OTlfNzc1MjAzMDg0OTAyODQ3MzE5MV9uLmpwZz9zdHA9ZHN0LWpwZ19lMTVfZnJfcDEwODB4MTA4MF90dDYmX25jX2h0PXNjb250ZW50LWhlbDMtMS5jZG5pbnN0YWdyYW0uY29tJl9uY19jYXQ9MTAzJl9uY19vYz1RNmNaMlFFc2dteFBZY0ZHcWNhTFc5UUFXVlFBZmRqeGxzSGxONnlHZy1JVG9xbkUyclBnVm9CdEFOTXlpTWktdVJDdE5jQmY3UU5XX3ZYdTNKNDBWbXVEVXllRCZfbmNfb2hjPXpLVEs5NzNpMTVJUTdrTnZ3RWY0MDdGJl9uY19naWQ9NUF1Z1E0TW54VmtJR1VEX1pFcUlpUSZlZG09QU5US0lJb0JBQUFBJmNjYj03LTUmb2g9MDBfQWZkd0UwZldab3ZDaDZ3Rm9FejkwZnFoangyVENUdVZnUXRfbjYwUnhyMmxUQSZvZT02OEVDODNCNiZfbmNfc2lkPWQ4ODVhMiIsImZpbGVuYW1lIjoiU25hcEluc3RhLnRvXzU2MDQyODA0M18xODA2MjI3MDg3MzUzMDU5OV83NzUyMDMwODQ5MDI4NDczMTkxX24uanBnIiwibmJmIjoxNzU5OTUzMzA1LCJleHAiOjE3NTk5NTY5MDUsImlhdCI6MTc1OTk1MzMwNX0.E6Sj6GotJDMwinqeS5iHRISeYYvwTJ3gO9DBOQuosSA',
      url: 'https://www.instagram.com/p/DPT8kfsADHH/',
    },
    {
      id: 4,
      title: '',
      image: 'https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS81NTc2MTIwMzFfMTgwNjEzNTEzMDE1MzA1OTlfMzExNjczOTc5MjQyNjYwMzQ3MV9uLmpwZz9zdHA9ZHN0LWpwZ19lMTVfZnJfcDEwODB4MTA4MF90dDYmX25jX2h0PXNjb250ZW50LWhlbDMtMS5jZG5pbnN0YWdyYW0uY29tJl9uY19jYXQ9MTAzJl9uY19vYz1RNmNaMlFHMGk4Y01rdHlGUEZMMzJWbWREWkRMT0dEd3ZzSlBZemx3TldJcHlXT1Z5aTlzX2hYdDM2OFlfamZvZ2NCNnZmQlNMY29uR0dfel9RWTJIZVdJSzNjVCZfbmNfb2hjPVowOG1SaEllbkJnUTdrTnZ3RzF3YkN6Jl9uY19naWQ9UHlNRFotdC1za3F6Q0dDa0gxUTY3ZyZlZG09QU5US0lJb0JBQUFBJmNjYj03LTUmb2g9MDBfQWZkZDBYLUlUbFlraFliUUptSWloSHlnSUIxcm9UMTZ4WUYyNzNqVzdQRjlFZyZvZT02OEVDQTM3NSZfbmNfc2lkPWQ4ODVhMiIsImZpbGVuYW1lIjoiU25hcEluc3RhLnRvXzU1NzYxMjAzMV8xODA2MTM1MTMwMTUzMDU5OV8zMTE2NzM5NzkyNDI2NjAzNDcxX24uanBnIiwibmJmIjoxNzU5OTUzMjI4LCJleHAiOjE3NTk5NTY4MjgsImlhdCI6MTc1OTk1MzIyOH0.EOt34dWjMcLR9iBdyuUEHgC7WgA4CLDC0NKQC-Ht6WQ',
      url: 'https://www.instagram.com/p/DPRiS8_Ale7/',
    },
    {
      id: 5,
      title: '',
      image: 'https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS81NTc0MjE5NzNfMTgwNjEzMzU4NDU1MzA1OTlfOTAxMjM1OTkwNjI1NjUyMzU5OV9uLmpwZz9zdHA9ZHN0LWpwZ19lMTVfZnJfcDEwODB4MTA4MF90dDYmX25jX2h0PXNjb250ZW50LWhlbDMtMS5jZG5pbnN0YWdyYW0uY29tJl9uY19jYXQ9MTAzJl9uY19vYz1RNmNaMlFGUzA3WVJfdE5FQUZyM0I5ZEdxZGJDa0lMRldRc3JkNGluamlWZWI1OG0tem1rcGQ2V1pYbnEtQ01WdGVKNE80ZmtzdERaaGRldmVJYXJBcjE4QWVBOSZfbmNfb2hjPTNNVEh4YXg1ck5BUTdrTnZ3R2J4aUxaJl9uY19naWQ9ZmpzSk93a21GdmFmZEJKU0VtamxNZyZlZG09QU5US0lJb0JBQUFBJmNjYj03LTUmb2g9MDBfQWZkRzBJcFZIelBSYmxnZmFnMzgxeWlUVjYtV3BGalZJd2dFdnJuQ182b29tQSZvZT02OEVDODI2NyZfbmNfc2lkPWQ4ODVhMiIsImZpbGVuYW1lIjoiU25hcEluc3RhLnRvXzU1NzQyMTk3M18xODA2MTMzNTg0NTUzMDU5OV85MDEyMzU5OTA2MjU2NTIzNTk5X24uanBnIiwibmJmIjoxNzU5OTUyODg3LCJleHAiOjE3NTk5NTY0ODcsImlhdCI6MTc1OTk1Mjg4N30.NVJUni36Jk4Ik8Yj6vL30XXVCzpfZ9Cmsh1WM2wqHP8',
      url: 'https://www.instagram.com/p/DPRKFK7kbVu/',
    },
  ];

  return (
    <div className="space-y-8">
      <ButtonBackToExtra />
      <h1 className="text-2xl font-bold text-foreground">✏️ Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post, index) => (
          <motion.a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="block bg-card border rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
          >
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                <h3 className="text-white font-semibold text-center">{post.title}</h3>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default ExtraMaterialPost;
