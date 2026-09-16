import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS, formatBDT } from '../app.js';
import { getShopProducts, SHOP_DEFAULTS } from '../shop-state.js';

test('removed lampshades and stands are absent from the storefront catalog',()=>{
 assert.ok(PRODUCTS.every(p=>!['Lampshades','Lamp stands'].includes(p.category)));
 assert.ok(PRODUCTS.some(p=>p.id==='mahogany-wooden-floor-lamp'));
});
test('unknown prices never appear as free or match a price filter',()=>{
 assert.equal(formatBDT(null),'Price on request');
 const catalog=[...PRODUCTS,{...PRODUCTS[0],id:'unpriced-fixture',price:null}];
 const filtered=getShopProducts(catalog,{...SHOP_DEFAULTS,max:5000});
 assert.ok(filtered.every(p=>p.price!==null));
 for(const sort of ['price-ascending','price-descending']) {
 const sorted=getShopProducts(catalog,{...SHOP_DEFAULTS,sort});
 assert.equal(sorted.at(-1).price,null);
 }
});
