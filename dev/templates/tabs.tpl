<div class="tab-navigation swiper-container active_tab_{{activeTab}}">
    <div class="swiper-wrapper">
        {{#tabs}}
        <div class="tab-toggle swiper-slide" rel="{{color}}">{{{label}}}</div>
        {{/}}
    </div>
    <div class="currentBar"></div>
</div>