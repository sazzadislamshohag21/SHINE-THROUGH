const base = 'asseats/mahogany-floor-lamp/';
const originals = 'asseats/Real Product images/WhatsApp Image 2026-09-13 at ';

export const PRODUCT_MEDIA = {
  'mahogany-wooden-floor-lamp': {
    note: 'Shown with the small botanical-print shade. Original demonstration footage shows an alternate leaf-print shade.',
    views: [
      { key: 'front', title: 'Front view', file: '10.34.44.jpeg', alt: 'Front view of the mahogany floor lamp with the small botanical-print shade' },
      { key: 'materials', title: 'Material close-up', file: '10.34.46.jpeg', alt: 'Close-up of the grain and polished finish on the mahogany frame' },
      { key: 'top', title: 'Top view', file: '10.34.44 (2).jpeg', alt: 'Top view inside the shade showing the included bulb and metal support frame' },
      { key: 'side', title: 'Side view', file: '10.34.43 (2).jpeg', alt: 'Side view of the angular mahogany floor lamp with the small botanical-print shade' },
      { key: 'working', title: 'Light on', file: '10.34.47.jpeg', alt: 'Illuminated mahogany floor lamp with the small botanical-print shade' },
    ].map(view => ({ ...view, image: view.key === 'front' ? 'asseats/product-squares/mahogany-wooden-floor-lamp-1080.jpg' : `asseats/product-squares/mahogany-${view.key}-1080.jpg`, thumbnail: view.key === 'front' ? 'asseats/product-squares/mahogany-wooden-floor-lamp-1080.jpg' : `asseats/product-squares/mahogany-${view.key}-1080.jpg`, original: originals + view.file })),
    videos: [
      { title: 'The lamp, illuminated', kind: 'Real product footage', file: 'video-working.mp4', poster: 'video-working.webp', description: 'The actual lamp glowing through the larger leaf-print shade, with a close view of the wooden frame and light on the wall.' },
      { title: 'Bulb & shade, up close', kind: 'Real product footage', file: 'video-bulb.mp4', poster: 'video-bulb.webp', description: 'A closer look inside the shade at the included bulb and its metal support frame.' },
      { title: 'A corner, transformed', kind: 'Product advertisement', file: 'video-film.mp4', poster: 'video-film.webp', description: 'A short product advertisement showing the lamp in a room setting.' },
    ].map(video => ({ ...video, src: base + video.file, poster: { 'video-working.webp': 'asseats/product-squares/mahogany-working-1080.jpg', 'video-bulb.webp': 'asseats/product-squares/mahogany-top-1080.jpg', 'video-film.webp': 'asseats/product-squares/mahogany-wooden-floor-lamp-1080.jpg' }[video.poster] })),
  },
};
