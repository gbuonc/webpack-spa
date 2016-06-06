<div class="tabs-content swiper-wrapper">
    {{#tabs}}
        <div id="wrapper-{{@index + 1}}" class="vertical-scroller-wrapper swiper-slide">
            <div class="vertical-scroller-content" id="tab_{{id}}" style="padding:15px;">
                {{#contents}}
                    <div style="margin-bottom:10px; border-bottom:3px dashed #ccc;">
                        <h1 style="margin:0;">{{{title}}}</h1>
                        <img class="lazyload" data-src="{{images[0].url}}" alt="" style="width:100%; height:auto;">
                        <hr>
                        <p style="margin:0; font-family:georgia; font-weight:bold;">{{{post_chain}}}</p>
                        <p style="font-family:georgia;">{{{content}}}</p>
                    </div>
                {{/contents}}
            </div>
        </div>
    {{/}}
</div>
