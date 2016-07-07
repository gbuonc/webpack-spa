<div class="vertical-scroller-content">
    {{@articles}}
        {{_val.thumbnail.ifq-thumb-high.url}}
        <div class="newslist-block lazyload" data-bg="{{=_val.thumbnail.ifq-thumb-high.url}}">
        {{:_val.thumbnail.ifq-thumb-high.url}}
        <div class="newslist-block no-image">
        {{/_val.thumbnail.ifq-thumb-high.url}}
            <a href="?a={{=_val.url}}" class="article-detail-link" data-rel="{{=_val.id}}" data-cat="{{_val.isInHomepage}}homepage{{:_val.isInHomepage}}{{=_val.categories.0.slug}}{{/_val.isInHomepage}}">
            <div class="title-wrapper">
                <h1>
                    {{=_val.title}}
                    {{_val.author.byline}}
                    <span style="color: {{=color}}">di {{=_val.author.byline}}</span>
                    {{/_val.author.byline}}
                </h1>
            </div>
            </a>
        </div>
    {{/@articles}}
</div>
