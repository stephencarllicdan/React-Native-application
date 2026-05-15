import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
 Image,
  TextInput,
  ScrollView,
  Animated,
  Easing,
  Modal,
  Alert
} from 'react-native';

import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

import { signOut } from 'firebase/auth';

import { db, auth } from '../firebase/config';

export default function HomeScreen({ navigation }) {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, 'movies'),
      snapshot => {

        const movieList = snapshot.docs
          .map(docu => ({
            id: docu.id,
            ...docu.data()
          }))
          .filter(
            movie =>
              movie.userId === auth.currentUser?.uid
          );

        setMovies(movieList);

      }
    );

    return unsubscribe;

  }, []);


  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );


  const logoutUser = async () => {

    try {

      await signOut(auth);

      navigation.replace('Login');

    } catch (error) {

      Alert.alert('Error', error.message);

    }

  };


  const deleteMovie = async (id) => {

    await deleteDoc(doc(db, 'movies', id));

    setModalVisible(false);

  };


  const watchedMovie = async (movie) => {

    await updateDoc(doc(db, 'movies', movie.id), {

      status: '🍿 Watched'

    });

    setModalVisible(false);

  };


  const nowShowing = [

    {
      id: '1',
      title: 'Avengers',
      image:
        'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
    },

    {
      id: '2',
      title: 'John Wick',
      image:
        'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg'
    },

    {
      id: '3',
      title: 'Batman',
      image:
        'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg'
    },

    {
      id: '4',
      title: 'Spider-Man',
      image:
        'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'
    },

    {
      id: '5',
      title: 'Oppenheimer',
      image:
        'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg'
    },

    {
      id: '6',
      title: 'Top Gun',
      image:
        'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg'
    }

  ];


  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.loop(

      Animated.timing(slideAnim, {

        toValue: -1100,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true

      })

    ).start();

  }, []);

  return (

    <ScrollView style={styles.container}>


      <View style={styles.topBar}>

        <Text style={styles.logo}>
          CineTrack
        </Text>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={logoutUser}
        >

          <Text style={styles.logoutText}>
            Logout
          </Text>

        </TouchableOpacity>

      </View>

      {/* SEARCH */}

      <TextInput
        placeholder="Search Movies..."
        placeholderTextColor="#888"
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />


      <Text style={styles.sectionTitle}>
        🎬 Now Showing
      </Text>

      <View style={{ overflow: 'hidden' }}>

        <Animated.View
          style={[
            styles.sliderContainer,
            {
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >

          {[...nowShowing, ...nowShowing].map((item, index) => (

            <View
              key={index}
              style={styles.showingCard}
            >

              <Image
                source={{ uri: item.image }}
                style={styles.showingImage}
              />

              <Text style={styles.showingTitle}>
                {item.title}
              </Text>

            </View>

          ))}

        </Animated.View>

      </View>


      <View style={styles.row}>

        <Text style={styles.sectionTitle}>
          🔥 My Watchlist
        </Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('Add Movie')}
        >

          <Text style={styles.addText}>
            + Add
          </Text>

        </TouchableOpacity>

      </View>

      {/* MOVIES */}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.movieCard}
            onPress={() => {

              setSelectedMovie(item);
              setModalVisible(true);

            }}
          >

            <Image
              source={{ uri: item.poster }}
              style={styles.poster}
            />

            <Text style={styles.movieTitle}>
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

          </TouchableOpacity>

        )}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >

        <View style={styles.modalContainer}>

          <View style={styles.modalBox}>

            {selectedMovie && (

              <>

                <Image
                  source={{ uri: selectedMovie.poster }}
                  style={styles.modalImage}
                />

                <Text style={styles.modalTitle}>
                  {selectedMovie.title}
                </Text>

                <TouchableOpacity
                  style={styles.watchBtn}
                  onPress={() => watchedMovie(selectedMovie)}
                >

                  <Text style={styles.btnText}>
                    🍿 Mark as Watched
                  </Text>

                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => deleteMovie(selectedMovie.id)}
                >

                  <Text style={styles.btnText}>
                    🗑 Remove Movie
                  </Text>

                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                >

                  <Text style={styles.close}>
                    Close
                  </Text>

                </TouchableOpacity>

              </>

            )}

          </View>

        </View>

      </Modal>

      <View style={{ height: 60 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20
  },

  logo: {
    color: '#E50914',
    fontSize: 40,
    fontWeight: 'bold'
  },

  logoutBtn: {
    backgroundColor: '#E50914',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10
  },

  logoutText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  search: {
    backgroundColor: '#1A1A1A',
    color: '#fff',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginBottom: 15
  },

  sliderContainer: {
    flexDirection: 'row',
    paddingLeft: 15
  },

  showingCard: {
    width: 160,
    marginRight: 15
  },

  showingImage: {
    width: 160,
    height: 230,
    borderRadius: 15
  },

  showingTitle: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold'
  },

  row: {
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  addBtn: {
    backgroundColor: '#E50914',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10
  },

  addText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  movieCard: {
    width: 190,
    backgroundColor: '#111',
    borderRadius: 18,
    padding: 10,
    marginLeft: 15
  },

  poster: {
    width: '100%',
    height: 250,
    borderRadius: 15
  },

  movieTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10
  },

  genre: {
    color: '#999',
    marginTop: 3
  },

  rating: {
    color: '#FFD700',
    marginTop: 4
  },

  status: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 15
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalBox: {
    width: '85%',
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20
  },

  modalImage: {
    width: '100%',
    height: 350,
    borderRadius: 15
  },

  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 20,
    textAlign: 'center'
  },

  watchBtn: {
    backgroundColor: '#22C55E',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15
  },

  deleteBtn: {
    backgroundColor: '#DC2626',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  close: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16
  }

});