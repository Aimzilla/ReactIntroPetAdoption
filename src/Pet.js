import React from 'react';
import { Link } from '@reach/router';

// Start object like this with specific names
// const Pet = () => {
//     return React.createElement("div", {}, [
//         React.createElement("h1", {}, "Squeakers"),
//         React.createElement("h2", {}, "Cat"),
//         React.createElement("h2", {}, "Queen")
//     ]);
// };
// Then, move to props...
// const Pet = (props) => {
//     return React.createElement("div", {}, [
//         React.createElement("h1", {}, props.name),
//         React.createElement("h2", {}, props.animal),
//         React.createElement("h2", {}, props.breed)
//     ]);
// };
// Then, destructure:  get rid of the props to simplify:
// export default function Pet({ name, animal, breed }) {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, name),
//     React.createElement("h2", {}, animal),
//     React.createElement("h2", {}, breed),
//   ]);
// };

// Then convert return statement to jsx:
export default function Pet({ name, animal, breed, media, location, id }) {
    
    let hero = 'http://placecorgi.com/300/300';
    if(media.length) {
        hero = media[0].small;
    }

    return (
        <Link to={`/details/${id}`} className="pet">
            <div className="image-container">
                <img src={hero} alt={name} />
            </div>
            <div className="info">
                <h1>{name}</h1>
                <h2>{`${animal} - ${breed} - ${location}`}</h2>
            </div>
        </Link>
    )
};