const Hashtags = ({}) => {
  return (
    <h4>
      {data.length > 0 &&
        data.map(hashtag => (
          <span key={hashtag} className="badge badge-pill badge-info">
            #{hashtag}
            <span />
          </span>
        ))}
      {translatedData.length > 0 &&
        translatedData.map(hashtag => (
          <span key={hashtag} className="badge badge-pill badge-info">
            #{hashtag}
            <span />
          </span>
        ))}
    </h4>
  )
}
