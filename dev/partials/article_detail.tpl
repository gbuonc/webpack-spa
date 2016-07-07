<div class="article-content swiper-slide" data-post-type="{{=post_type}}">
    <div class="padded">
        <div class="post-kicker">{{=post_kicker}}</div>
        <h1>{{=title}}</h1>
        <div class="post-chain">{{=post_chain}}</div>
        {{author.byline}}
        <div class="byline">di {{=author.byline}}</div>
        {{/author.byline}}
    </div>
    <!-- /* video */ -->
    {{post_type.is_video}}
    <div class="videoplayer" data-video-id="{{=video}}">
        <div class="player-wrapper">
            <span class="show-video show-btn"><strong>Show Video</strong></span>
            <img class="lazyload" data-src="{{=thumbnail.ifq-thumb-high.url}}" alt=""/>
        </div>
    </div>
    {{/post_type.is_video}}
    <!-- /* gallery */ -->
    {{post_type.is_gallery}}
    <div id="article-carousel">
        <span class="show-gallery show-btn"><strong>Show Gallery</strong></span>
        <div class="article-gallery swiper-container" id="article-gallery">
            <div class="swiper-wrapper">
                {{@gallery}}
                <div class="swiper-slide">
                    <img class="lazyload" data-src="{{=_val.ifq-thumb-high.url}}" alt=""/>
                </div>
                {{/@gallery}}
            </div>
        </div>
    </div>
    {{/post_type.is_gallery}}
    <!-- /* articolo */ -->
    {{post_type.is_article}}
    {{thumbnail.ifq-thumb-high.url}}
        <img class="lazyload" data-src="{{=thumbnail.ifq-thumb-high.url}}" alt="">
    {{/thumbnail.ifq-thumb-high.url}}
    {{/post_type.is_article}}
    <!-- /* Immagine */ -->
    {{post_type.is_image}}
    {{thumbnail.ifq-thumb-high.url}}
        <img class="lazyload" data-src="{{=thumbnail.ifq-thumb-high.url}}" alt="">
    {{/thumbnail.ifq-thumb-high.url}}
    {{/post_type.is_image}}
    <div class="dfp-placeholder dfp-placeholder-top"></div>
    <div class="padded">
        <div class="article-body">{{=content}}</div>
    </div>
    <div class="dfp-placeholder dfp-placeholder-bottom"></div>
</div>
