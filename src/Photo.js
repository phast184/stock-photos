import React from 'react'

const Photo = ({photo}) => {
  const {user, urls, alt_description, likes} = photo;
  const {name, portfolio_url: portfolio, profile_image} = user;
  const {large: avatar} = profile_image;
  return <article className = 'photo'>
    <img src = {urls.regular} alt = {alt_description}/>
    <div className = 'photo-info'>
      <div>
        <h4>{name}</h4>
        <p>{likes} likes</p>
      </div>
      <a href = {portfolio}>
          <img src = {avatar} alt = 'user profile image' className = 'user-img' />
        </a>
    </div>
  </article>
}

export default Photo
