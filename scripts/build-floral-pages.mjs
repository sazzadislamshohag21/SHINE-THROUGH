import { readFile, writeFile } from 'node:fs/promises';
import { FLORAL_PRODUCTS } from '../floral-products.js';
const template = await readFile(new URL('../mahogany-product.html', import.meta.url), 'utf8');
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
for (const p of FLORAL_PRODUCTS) {
  const price = p.price.toLocaleString('en-US');
  const views = [
    { title: 'Front view', image: p.image, crop: '', alt: p.imageAlt },
    { title: 'Wood frame', image: p.image, crop: 'frame', alt: `${p.shortName}: wooden frame detail from supplied photograph` },
    { title: 'Shade detail', image: p.image, crop: 'shade', alt: `${p.shortName}: ${p.shade.toLowerCase()} detail from supplied photograph` },
    { title: 'Base detail', image: p.image, crop: 'base', alt: `${p.shortName}: base detail from supplied photograph` },
    { title: 'In your room', image: p.lifestyle, crop: '', alt: `${p.shortName} in a digitally styled warm room` },
  ];
  const image = (view, extra='') => `<img src="${view.image}" alt="${esc(view.alt)}" class="floral-crop-${view.crop || 'none'}" width="1254" height="1254" loading="lazy" ${extra} />`;
  let html = template.replaceAll('mahogany-product.js','floral-product.js')
    .replace('</head>', `<link rel="stylesheet" href="floral-product.css" />\n<script type="application/json" id="floral-config">${JSON.stringify({id:p.id,name:p.name,shade:p.shade,original:p.image,views})}</script>\n</head>`)
    .replaceAll('Mahogany Wooden Floor Lamp',p.name)
    .replaceAll('mahogany-wooden-floor-lamp',p.id)
    .replaceAll('2,850',price)
    .replace(/<meta name="description"[^>]+>/,`<meta name="description" content="${esc(p.description)}" />`)
    .replace(/<meta property="og:description"[^>]+>/,`<meta property="og:description" content="${esc(p.description)}" />`)
    .replace(/<meta property="og:image"[^>]+>/,`<meta property="og:image" content="${p.image}" />`)
    .replace(/<h1 id="lamp-title">[\s\S]*?<\/h1>/,`<h1 id="lamp-title">${p.shortName}<br /><em>Floor Lamp.</em></h1>`)
    .replace(/<p class="lamp-intro">[\s\S]*?<\/p>/,`<p class="lamp-intro">${p.description}</p>`)
    .replace('BDT · Bulb included','BDT')
    .replace('Natural mahogany',p.tone.split(' · ')[0])
    .replace(/<p class="lamp-shade-note">[\s\S]*?<\/p>/,`<p class="lamp-shade-note">${p.shade} shade, as shown in your product photograph.</p>`)
    .replace(/<div class="lamp-reassurance">[\s\S]*?<\/div>/,'<div class="lamp-reassurance"><span>Wooden frame</span><span>Floral drum shade</span></div>')
    .replace(/<dl>[\s\S]*?<\/dl>/,`<dl><div><dt>Stand &amp; frame</dt><dd>${p.tone}</dd></div><div><dt>Shade</dt><dd>${p.shade} drum shade</dd></div><div><dt>Design</dt><dd>${p.structure}</dd></div><div><dt>Dimensions &amp; accessories</dt><dd><a href="https://www.facebook.com/shinethrough26/" target="_blank" rel="noopener noreferrer">Ask us for measurements, bulb and plug details ↗</a></dd></div></dl>`)
    .replace(/Your lamp includes the mahogany[\s\S]*?two-pin plug\./,'The design pairs a wooden stand with a floral drum shade. Message us to confirm the bulb, cable, plug and final package contents before ordering.')
    .replace('What we provide','Your lamp &amp; accessories')
    .replaceAll('What’s included','The design')
    .replace('See every component','Explore the design')
    .replace('Watch the film','The photo story')
    .replace('Everything included.','A considered design.')
    .replace('The complete piece','The details that make it')
    .replace(/<div class="lamp-thumbs"[\s\S]*?<p class="visually-hidden"/,`<div class="lamp-thumbs" aria-label="Choose a product view">${views.map((v,i)=>`<a class="lamp-thumb" href="${v.image}" data-lamp-view="${i}" ${i===0?'aria-current="true"':''} aria-label="Show ${v.title.toLowerCase()}"><span class="floral-thumb-photo">${image(v)}</span><span>${v.title}</span></a>`).join('')}</div><p class="lamp-media-note">Product photo and detail crops supplied by the store. Room setting is digitally styled. <button type="button" data-original-toggle aria-pressed="false">View original photo</button></p><p class="visually-hidden"`)
    .replace(/<div class="lamp-included-grid">[\s\S]*?<\/section>/,`<div class="lamp-included-grid">${[
      [views[1],'The wooden frame',p.structure],
      [views[2],'A floral expression',`${p.shade} brings a distinct palette and personality to the drum shade.`],
      [views[3],'Grounded in detail',p.tone.includes('tiers')?'Round display tiers add character to the open frame.':'An open wooden base keeps the silhouette light and uncluttered.'],
      [views[4],'An evening glow','Picture the lamp in a warm, quiet corner. Digitally styled room setting.'],
    ].map(([v,title,copy],i)=>`<article><div class="lamp-component-image">${image(v)}<span>0${i+1}</span></div><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></section>`)
    .replace(/<div class="lamp-material-photo">[\s\S]*?<\/div>/,`<div class="lamp-material-photo floral-detail-photo">${image(views[1])}<span class="lamp-photo-label">01 — The wooden silhouette</span></div>`)
    .replace('The beauty is in the wood. The mahogany frame brings rich colour and visible grain, while its open, angled form lets the room breathe.',p.structure)
    .replace('An open silhouette.',p.heading)
    .replace('See the frame from the front and side to appreciate how the lines meet.','Explore the frame and base details in the gallery above.')
    .replace('A patterned drum shade adds a little character above the clean wooden frame.',`${p.shade} brings colour and pattern above the warm wooden finish.`)
    .replace('Explore all five views','Explore all five images')
    .replace('See it working','Explore the photo story')
    .replace('Small botanical-print shade shown.',`${p.shade} · Digitally styled room setting.`)
    .replace(/<figure><img[\s\S]*?<\/figure>/,`<figure>${image(views[4])}<figcaption><span class="lamp-glow-dot"></span> Warm light · ${p.shade}</figcaption></figure>`)
    .replace(/<section class="lamp-film[\s\S]*?<\/section>/,`<section class="lamp-film section-shell lamp-section" id="product-film" aria-labelledby="film-title"><div class="lamp-section-heading"><div><p class="eyebrow">The lamp, in detail</p><h2 id="film-title">See the details.<br /><em>Feel the difference.</em></h2></div><p>From the floral shade to the wooden frame, explore the details and imagine its place at home.</p></div><div class="lamp-film-layout"><div class="lamp-player-wrap floral-story-photo">${image(views[4], 'data-story-image')}</div><div class="lamp-playlist"><p class="eyebrow">Choose your view</p>${[views[4],views[2],views[1]].map((v,i)=>`<a href="${v.image}" data-story-view="${[4,2,1][i]}" ${i===0?'aria-current="true"':''}><span class="lamp-play-symbol">↗</span><span><strong>${v.title}</strong><small>${i===0?'Digitally styled room':'Detail from product photograph'}</small></span><span>0${i+1}</span></a>`).join('')}<p data-story-description>Digitally styled room setting based on the supplied product photograph.</p><a class="text-link" href="#product-main">Explore the full gallery ↑</a></div></div><div class="lamp-film-closing"><span>${p.name}</span><span>Made for your next quiet evening.</span><a href="#product-main">Make room for it · ৳ ${price} ↑</a></div></section>`);
  // Replace the initial gallery and lightbox image with this product's source photo.
  html = html.replace(/<a href="[^"]+" class="lamp-main-image-link"[\s\S]*?<\/a>/,`<a href="${p.image}" class="lamp-main-image-link" data-image-zoom aria-label="Enlarge front view"><img src="${p.image}" alt="${esc(p.imageAlt)}" width="1254" height="1254" fetchpriority="high" data-lamp-image /><span class="lamp-zoom-icon" aria-hidden="true">↗</span></a>`)
    .replace('Mahogany · Botanical print',p.shade)
    .replace(/<img[^>]*data-lightbox-image[^>]*>/,`<div class="floral-lightbox-photo"><img src="${p.image}" alt="${esc(p.imageAlt)}" data-lightbox-image width="1254" height="1254" /></div>`);
  const related = FLORAL_PRODUCTS.filter(other=>other.id!==p.id).slice(0,3);
  html=html.replace(/<div class="pd-related-grid">[\s\S]*?<\/section>/,`<div class="pd-related-grid">${related.map(other=>`<article class="pd-related-card"><a class="pd-related-photo" href="${other.page}"><img src="${other.image}" alt="${esc(other.imageAlt)}" loading="lazy" width="1254" height="1254" /><span>New</span><b aria-hidden="true">↗</b></a><p class="pd-small-label">Floor lamps</p><h3><a href="${other.page}">${other.name}</a></h3><div><span>${other.shade}</span><strong>৳ ${other.price.toLocaleString('en-US')}</strong></div></article>`).join('')}</div></section>`);
  await writeFile(new URL('../'+p.page,import.meta.url),html);
}
console.log(`Generated ${FLORAL_PRODUCTS.length} floral product pages.`);
