export const id_gener_map = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10749: "Romance",
};

export const gener_id_map = {
  Adventure: 12,
  Fantasy: 14,
  Animation: 16,
  Drama: 18,
  Horror: 27,
  Action: 28,
  Comedy: 35,
  History: 36,
  Western: 37,
  Thriller: 53,
  Crime: 80,
  Documentary: 99,
  "Science Fiction": 878,
  Mystery: 9648,
  Music: 10402,
  Romance: 10749,
  Family: 10751,
  War: 10752,
  "TV Movie": 10770,
};

export default function getMovieGenerFormId(id) {
  return id_gener_map[id];
}
