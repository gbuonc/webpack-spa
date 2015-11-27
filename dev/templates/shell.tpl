<div class="tab-navigation swiper-container active_tab_{{activeTab}}">
    <div class="swiper-wrapper">
        {{#tabs}}
        <div class="tab-toggle swiper-slide" rel="{{color}}">{{{label}}}</div>
        {{/}}
    </div>
    <div class="currentBar"></div>
</div>
<div id="tabs-scroller" class="tabs-scroller swiper-container">
    <div class="tabs-content swiper-wrapper">
        {{#tabs}}
            <div id="wrapper-{{@index + 1}}" class="vertical-scroller-wrapper swiper-slide">
                <div class="vertical-scroller-content" id="tab_{{id}}">
                    {{{label}}}
                </div>
            </div>
        {{/}}
    </div>
</div>