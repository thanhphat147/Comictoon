import React, {Component} from 'react'

export default class Comic {
  constructor(id, title, category, dateCreated, imgComic, likeVote) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.dateCreated = dateCreated;
    this.imgComic = imgComic;
    this.likeVote = likeVote;
  }
}