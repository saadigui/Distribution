import React from 'react'

import {trans, transChoice} from '#/main/core/translation'
import {asset} from '#/main/core/scaffolding/asset'
import {displayDate} from '#/main/core/scaffolding/date'

// TODO : reuse in portal (cannot be done know because of the video modale)

const ResourceCard = (row) => ({
  poster: row.thumbnail ? asset(row.thumbnail) : null, // todo generate and use thumbnail
  //icon: <img className="resource-icon" src={asset(row.meta.icon)} />,
  title: row.name,
  //subtitle: trans(row.meta.type, {}, 'resource'),
  /*flags: [
    ['fa fa-fw fa-eye', trans('resource_views', {}, 'resource'), row.meta.views],
    row.social && ['fa fa-fw fa-thumbs-up', trans('resource_likes', {}, 'resource'), row.social.likes]
  ],*/
  contentText: row.meta.description/*,
  footer:
    <div>
      {trans('published_at', {date: displayDate(row.meta.created, false, true)})}
    </div>,
  footerLong:
    <div>
      <span className="publish-date">{trans('published_at', {date: displayDate(row.meta.created, false, true)})}</span>
      <span className="creator"> {trans('by')} {row.meta.creator ? row.meta.creator.name: trans('unknown')}</span>
    </div>*/
})

export {
  ResourceCard
}
