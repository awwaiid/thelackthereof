import { access, constants } from 'node:fs/promises';
import sanitize from 'sanitize-filename';

import FeedlyClient from "node-feedly-developer-client";
const feedly = new FeedlyClient({
  accessToken: "A_YJpW9ipv0FY0yR5VDATuM6AEF0-MJHixPgsFC-IywvEppQDanMLz1fQhOTrNay6DnJ31T_0g4JfynonEUMVVojAMtFnRzcOlFd1apHPt2Og8HS6IWiFrC4D5hIpIffQccZFL5r62G0rZkJDQlzShNjgd_bWwR0Gvkiq6nopEZUro-RdLpRyYW8yrr7fdnIDD-EUv765mSrZogW8HkCQEKtE1coveY0pboHlnBiOCbHW6LEjC5jBCAvVhR9:feedlydev",
  refreshToken: "A0ZSIda_rvii1W3AZ5oGD1fFsS7YsTVYcKPhJfafuwX6dso0vqicvrZsLDmICzdq9L8Mpv-MnNWk5GweG3FY7w6CoWhw90nHngeDS6wZ00WbCZIA8RnP3Sd3ydyg5PH3OP1mLv9Vtlx-G0EtQm_Utfkjk1t2nQaGqWoUHlbRe7-ZvHSOqrFfeu7v6Srfrmrur-68IuRKrw4pRXU6qkms4vwIEu59:feedlydev"
});

// let {response, body} = await feedly.profile();
// console.dir(body);

let {request, body: tags} = await feedly.request("/v3/tags");
console.dir(tags);

let cool_stuff_tag = tags.find(tag => tag.label == 'Cool stuff');
console.dir(cool_stuff_tag);

let {body: contents} = await feedly.request(`/v3/streams/${encodeURIComponent(cool_stuff_tag.streamId)}/contents`);
// console.dir(contents);




contents.items.forEach(async article => {
  console.log("Title:", article.title);
  console.log("Filename:", sanitize(article.title));
  console.log("Summary:", article.summary?.content);
  console.log("Content:", article.content);
  console.log("Link:", article.canonicalUrl);
  console.dir("visual", article.visual);

  try {
    await access(`../content/feed/${sanitize(article.title)}.md`, constants.R_OK | constants.W_OK);
    console.log('can access');
  } catch {
    console.error('error');
  }

});


console.dir(contents.items[0]);

