export async function fetchNativePrice(apiNetwork, address) {
  try {
    const url = `https://api.geckoterminal.com/api/v2/networks/${apiNetwork}/tokens/${address}`;
    const resp = await fetch(url);
    const json = await resp.json();
    const price = json.data?.attributes?.price_usd;
    return price ? parseFloat(price) : null;
  } catch (e) {
    return null;
  }
}
