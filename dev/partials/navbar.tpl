<div class="tab-navigation swiper-container">
    <div class="header-logo">
        <img src="/static/img/icon.png" alt="FQ" data-rel="homepage">
    </div>
    <div class="swiper-wrapper">
        {{@tabs}}
        <div class="tab-toggle swiper-slide" data-rel="{{=_val.slug}}">{{=_val.name}}</div>
        {{/@tabs}}
    </div>
</div>
