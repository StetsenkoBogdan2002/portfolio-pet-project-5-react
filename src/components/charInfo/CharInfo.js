import "./charInfo.scss";
import { useEffect, React, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import errorImage from "../charList/errorImage.jpg";
import PropTypes from "prop-types";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const {loading,error,getCharacter,clearError} = useMarvelService();
  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    if (!props.charId) {
      return;
    }
    clearError();
    getCharacter(props.charId)
      .then((res) => onCharLoaded(res));
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  let { name, description, thumbnail, homepage, wiki, comics } = char;
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    thumbnail = errorImage;
  }
  return (
    <>
      <div className="char__basics">
        <img style={{ objectFit: "contain" }} src={thumbnail} alt="abyss" />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There are no comics :("}
        {comics.map((item, index) => {
          if (index > 10) {
            return null;
          }
          return (
            <li key={index} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};
export default CharInfo;
