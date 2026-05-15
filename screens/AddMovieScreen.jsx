import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert
} from 'react-native';

import {
  collection,
  addDoc
} from 'firebase/firestore';

import { db, auth } from '../firebase/config';

export default function AddMovieScreen({ navigation }) {

  const movies = [

    {
      id: '1',
      title: 'Avengers Endgame',
      genre: 'Action',
      rating: '9/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
    },

    {
      id: '2',
      title: 'John Wick 4',
      genre: 'Action',
      rating: '8.5/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg'
    },

    {
      id: '3',
      title: 'Interstellar',
      genre: 'Sci-Fi',
      rating: '9.5/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
    },

    {
      id: '4',
      title: 'Spider-Man No Way Home',
      genre: 'Marvel',
      rating: '9/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'
    },

    {
      id: '5',
      title: 'The Batman',
      genre: 'DC',
      rating: '8/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg'
    },

    {
      id: '6',
      title: 'Top Gun Maverick',
      genre: 'Action',
      rating: '8.7/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg'
    },

    {
      id: '7',
      title: 'Oppenheimer',
      genre: 'Drama',
      rating: '9.4/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg'
    },

    {
      id: '8',
      title: 'Avatar 2',
      genre: 'Sci-Fi',
      rating: '9.1/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg'
    },

    {
      id: '9',
      title: 'Joker',
      genre: 'Drama',
      rating: '9.3/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg'
    },

    {
      id: '10',
      title: 'Doctor Strange',
      genre: 'Marvel',
      rating: '8.8/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/wRnbWt44nKjsFPrqSmwYki5vZtF.jpg'
    },

    {
      id: '11',
      title: 'Fast X',
      genre: 'Action',
      rating: '8/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg'
    },

    {
      id: '12',
      title: 'Aquaman',
      genre: 'DC',
      rating: '8.2/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg'
    },

    {
      id: '13',
      title: 'Black Panther',
      genre: 'Marvel',
      rating: '9/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg'
    },

    {
  id: '14',
  title: 'Cars',
  genre: 'Animation',
  rating: '8.7/10',
  status: '🎬 Watching',
  poster:
    'https://image.tmdb.org/t/p/w500/qa6HCwP4Z15l3hpsASz3auugEW6.jpg'
},

    {
      id: '15',
      title: 'Mission Impossible',
      genre: 'Action',
      rating: '8.9/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg'
    },

    {
      id: '16',
      title: 'The Flash',
      genre: 'DC',
      rating: '8.1/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg'
    },

    {
      id: '17',
      title: 'Deadpool',
      genre: 'Marvel',
      rating: '9/10',
      status: '🎬 Watching',
      poster:
        'https://image.tmdb.org/t/p/w500/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg'
    },

    {
  id: '19',
  title: 'Frozen 2',
  genre: 'Animation',
  rating: '8.9/10',
  status: '🎬 Watching',
  poster:
    'https://image.tmdb.org/t/p/w500/mINJaa34MtknCYl5AjtNJzWj8cD.jpg'
},

{
  id: '20',
  title: 'Minions',
  genre: 'Comedy',
  rating: '8.3/10',
  status: '🎬 Watching',
  poster:
    'https://image.tmdb.org/t/p/w500/vlOgaxUiMOA8sPDG9n3VhQabnEi.jpg'
},

{
  id: '21',
  title: 'Inside Out 2',
  genre: 'Animation',
  rating: '9.3/10',
  status: '🎬 Watching',
  poster:
    'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg'
},

{
  id: '22',
  title: 'Kung Fu Panda',
  genre: 'Animation',
  rating: '9/10',
  status: '🎬 Watching',
  poster:
    'https://image.tmdb.org/t/p/w500/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg'
},

{
  id: '23',
  title: 'Toy Story 4',
  genre: 'Animation',
  rating: '8.8/10',
  status: '🎬 Watching',
  poster:
    'https://image.tmdb.org/t/p/w500/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg'
}

  ];

  const addMovie = async (movie) => {

    try {

      await addDoc(collection(db, 'movies'), {

        userId: auth.currentUser.uid,
        title: movie.title,
        genre: movie.genre,
        rating: movie.rating,
        status: movie.status,
        poster: movie.poster

      });

      Alert.alert(
        'Success',
        movie.title + ' added to Watchlist'
      );

      navigation.navigate('Home');

    } catch (error) {

      Alert.alert('Error', error.message);

    }

  };

  return (

    <View style={styles.container}>

      <View style={styles.topBar}>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate('Home')}
        >

          <Text style={styles.backText}>
            ← Back
          </Text>

        </TouchableOpacity>

      </View>

      <Text style={styles.logo}>
        Select Movie
      </Text>

      <FlatList
        data={movies}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{
          justifyContent: 'space-between'
        }}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() => addMovie(item)}
          >

            <Image
              source={{ uri: item.poster }}
              style={styles.poster}
            />

            <View style={styles.infoBox}>

              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.genre}>
                {item.genre}
              </Text>

              <Text style={styles.rating}>
                ⭐ {item.rating}
              </Text>

              <Text
                style={[
                  styles.status,
                  {
                    color:
                      item.status === '🍿 Watched'
                        ? '#22C55E'
                        : '#EF4444'
                  }
                ]}
              >
                {item.status}
              </Text>

            </View>

          </TouchableOpacity>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 15
  },

  topBar: {
    marginBottom: 20
  },

  backBtn: {
    backgroundColor: '#111',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10
  },

  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  logo: {
    color: '#E50914',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 25
  },

  card: {
    width: '47%',
    backgroundColor: '#111',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#222'
  },

  poster: {
    width: '100%',
    height: 260,
    resizeMode: 'cover'
  },

  infoBox: {
    padding: 12
  },

  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  genre: {
    color: '#999',
    marginTop: 4
  },

  rating: {
    color: '#FFD700',
    marginTop: 5,
    fontWeight: 'bold'
  },

  status: {
    marginTop: 6,
    fontWeight: 'bold'
  }

});