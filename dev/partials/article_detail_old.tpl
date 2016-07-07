<div class="article-navigation swiper-container">
    <div class="swiper-wrapper">
    {{@articles}}
        <div class="article-content swiper-slide" data-post-type="{{=_val.post_type}}">
            <div class="padded">
                <div class="post-kicker">{{=_val.post_kicker}}</div>
                <h1>{{=_val.title}}</h1>
                <div class="post-chain">{{=_val.post_chain}}</div>
                {{_val.author.byline}}
                <div class="byline">di {{=_val.author.byline}}</div>
                {{/_val.author.byline}}
            </div>
            <!-- /* video */ -->
            {{_val.post_type.is_video}}
            <div class="videoplayer" data-video-id="{{=_val.video}}">
                <div class="player-wrapper"></div>
            </div>
            {{/_val.post_type.is_video}}
            <!-- /* gallery */ -->
            {{_val.post_type.is_gallery}}
            <div id="article-carousel">
                <span class="show-gallery"><strong>Show Gallery</strong></span>
                <div class="article-gallery swiper-container" id="article-gallery">
                    <div class="swiper-wrapper">
                        {{@_val.gallery}}
                        <div class="swiper-slide">
                            <img class="lazyload" data-src="{{=_val.ifq-thumb-high.url}}" alt=""/>
                        </div>
                        {{/@_val.gallery}}
                    </div>
                </div>
            </div>
            {{/_val.post_type.is_gallery}}
            <!-- /* articolo */ -->
            {{_val.post_type.is_article}}
            {{_val.thumbnail.ifq-thumb-high.url}}
                <img class="lazyload" data-src="{{=_val.thumbnail.ifq-thumb-high.url}}" alt="">
            {{/_val.thumbnail.ifq-thumb-high.url}}
            {{/_val.post_type.is_article}}
            <!-- /* Immagine */ -->
            {{_val.post_type.is_image}}
            {{_val.thumbnail.ifq-thumb-high.url}}
                <img class="lazyload" data-src="{{=_val.thumbnail.ifq-thumb-high.url}}" alt="">
            {{/_val.thumbnail.ifq-thumb-high.url}}
            {{/_val.post_type.is_image}}
            <div class="dfp-placeholder dfp-placeholder-top"></div>
            <div class="padded">
                <div class="article-body">{{=_val.content}}</div>
            </div>
            <div class="dfp-placeholder dfp-placeholder-bottom"></div>
        </div>
    {{/@articles}}
    </div>
</div>
