<div class="article-content">
    <div class="post-kicker">{{post_kicker}}</div>
    <h1>{{title}}</h1>
    {{#author.byline}}<div class="byline">di {{author.byline}}</div>{{/}}
    {{#images[0].sizes['crop-4-3']}}<img class="lazyload" data-src="{{images[0].sizes['crop-4-3']}}" alt="">{{/}}
    <div class="post-chain">
        {{post_chain}}
    </div>
    <div class="article-body">
        {{{content}}}
    </div>
</div>
