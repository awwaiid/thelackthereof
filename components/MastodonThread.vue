<template>
  <hr>
  Comment by <a :href="link">replying on Mastodon</a>!

  <div v-if="replies" v-for="reply in replies">
    <div class="border border-black rounded-lg m-2 bg-slate-200" style="margin-left: calc(var(--mastodon-comment-indent) * ${depth})">
      <div class="flex m-2">
        <div class="flex flex-col">
          <img :src="reply.account.avatar_static" class="m-0 border border-black rounded-lg" style="height: 5em; width: 5em">
          <a class="whitespace-nowrap text-xs rounded-full border border-2 border-black pl-2 pr-2 mt-2 no-underline bg-black text-white" :href="reply.url" rel="nofollow">View / Reply</a>
        </div>
        <div class="ml-3 flex flex-col text-xs grow">
          <div class="flex flex-wrap justify-between">
            <a class="break-all" :href="reply.account.url" rel="nofollow">{{ reply.account.display_name }}</a>
            <a class="break-all" :href="reply.account.url" rel="nofollow">{{ user_account(reply.account) }}</a>
            <a class="break-all" :href="reply.url" rel="nofollow">{{ reply.created_at.substr(0, 10) }} {{ reply.created_at.substr(11, 8) }}</a>
          </div>
          <div class="ml-2" v-html="cleanHtml(reply.content)" />
        </div>
        <!-- <div class="flex flex-col justify-around"> -->
        <!--   <div> -->
        <!--     <a :href="reply.url" rel="nofollow"><i class="fa fa-reply fa-fw"></i>{{ reply_count(reply, 'replies') }} replies</a> -->
        <!--   </div> -->
        <!--   <div> -->
        <!--     <a :href="reply.url" rel="nofollow"><i class="fa fa-retweet fa-fw"></i>{{ reply_count(reply, 'reblogs') }} boosts</a> -->
        <!--   </div> -->
        <!--   <div> -->
        <!--     <a :href="reply.url" rel="nofollow"><i class="fa fa-star fa-fw"></i>{{ reply_count(reply, 'favourites') }} favorites</a> -->
        <!--   </div> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import DOMPurify from 'isomorphic-dompurify';

// mastodonThread: https://mastodon.social/@awwaiid/110243919367988037
export default {
  props: ['link'],
  data() {
    return {
      replies: undefined
    }
  },
  mounted() {
    this.loadComments();
  },
  computed: {
    threadId () {
      let match;
      if(match = this.link.match(/\/(\d+)$/)) {
        return match[1];
      }
    },
    threadHost () {
      let match;
      if(match = this.link.match(/https:\/\/([^\/]+)\//)) {
        return match[1];
      }
    }
  },
  methods: {
    reply_count(reply, what) {
      var count = reply[what+'_count'];
      return count > 0 ? count : '0';
    },
    user_account(account) {
      var result =`@${account.acct}`;
      if (account.acct.indexOf('@') === -1) {
        var domain = new URL(account.url)
        result += `@${domain.hostname}`
      }
      return result;
    },
    cleanHtml(content) {
      return DOMPurify.sanitize(content);
    },
    async loadComments() {
      const response = await fetch('https://' + this.threadHost + '/api/v1/statuses/' + this.threadId + '/context');
      const postContext = await response.json();
      this.replies = postContext.descendants;
    }
  }

};
</script>
