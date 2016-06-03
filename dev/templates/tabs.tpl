<div class="tab-navigation swiper-container active_tab_{{activeTab}}">
    <div class="header-logo">
        <img src="static/img/icon.png" alt="">
    </div>
    <div class="swiper-wrapper">
        {{#tabs}}
        <div class="tab-toggle swiper-slide {{active ? 'active' : '' }}" rel="{{color}}" on-click="setActive">{{{label}}}</div>
        {{/}}
        <span class="currentBar" style="width:{{currentBar.width}}px; left:{{currentBar.left}}px; background:#000;"></span>
    </div>

</div>
