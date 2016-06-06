<div class="tabs-content swiper-wrapper">
    {{#tabs}}
        <div id="wrapper-{{@index + 1}}" class="vertical-scroller-wrapper swiper-slide">
            <div class="vertical-scroller-content" id="tab_{{id}}">
                {{#contents:i}}
                    <div class="newslist-block lazyload" data-bg="{{images[0].sizes['crop-4-3']}}">
                        <div class="title-wrapper">
                            <h1>
                                <a href="#{{url}}" data-cat="{{label}}" data-index="{{i}}" on-click="showArticle">{{{title}}}</a>
                                {{#author.byline}}<span style="color: {{color}}">di {{author.byline}}</span>{{/}}
                            </h1>
                        </div>
                        <!-- <img class="lazyload" data-src="{{images[0].url}}" alt="" style="width:100%; height:auto;"> -->
                        <!-- <p>{{{post_chain}}}</p>
                        <p style="font-family:georgia;">{{{content}}}</p> -->
                    </div>
                {{/}}
            </div>
        </div>
    {{/}}
</div>
