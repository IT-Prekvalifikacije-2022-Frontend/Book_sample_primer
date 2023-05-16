import './show_author.css';

const ShowAuthor = ({ author }) => {
  return (
    <div className="author_overviewcard">
      <div className="author_title_container">
        <p className="author_title">{author.name} </p>
      </div>
      <div className="author__info">
        {author.books.map((a) => (
          <span>{a.title}</span>
        ))}
      </div>
    </div>
  );
};


export default ShowAuthor;