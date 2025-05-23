import BaseLayout from '@/app/BaseLayout';
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const ANIMAL_ICONS = [
  '🐎', '🐖', '🐇', '🐕', '🦝', '🐀', '🦊', '🐐',
  '🐔', '🦃', '🦄', '🐓', '🐩', '🐑', '🐄', '🐖',
];

const NUM_ANIMALS = 12;
const PADDING_HORIZONTAL = 10;
const LINE_WIDTH = 24;
const TRACK_WIDTH = width - PADDING_HORIZONTAL * 2 - LINE_WIDTH * 2 - 48;
const ROW_HEIGHT = 50;

export default function PlayScreen({ navigation }: { navigation?: any }) {
  const [finishOrder, setFinishOrder] = useState<number[]>([]);
  const [raceStarted, setRaceStarted] = useState(false);
  const [showRaceUI, setShowRaceUI] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [resultCountdown, setResultCountdown] = useState(3);
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);
  const [showCongratsModal, setShowCongratsModal] = useState(false);

  // Always initialize animValues
  const animValues = useRef(
    Array.from({ length: NUM_ANIMALS }, () => useSharedValue(0))
  ).current;

  const onAnimalFinish = (index: number) => {
    setFinishOrder((prev: number[]) => {
      if (prev.includes(index)) return prev;
      return [...prev, index];
    });
  };

  const startRace = () => {
    if (selectedAnimal === null) {
      alert('Please select an animal to bet on before starting!');
      return;
    }
    setFinishOrder([]);
    setShowRaceUI(true);
    setRaceStarted(true);
    animValues.forEach((animValue) => {
      animValue.value = 0; // Reset position
    });
    animValues.forEach((animValue, index) => {
      const duration = 10000 + Math.random() * 3000;
      animValue.value = withDelay(
        index * 300,
        withTiming(TRACK_WIDTH, {
          duration,
          easing: Easing.inOut(Easing.quad),
        }, (isFinished) => {
          if (isFinished) {
            runOnJS(onAnimalFinish)(index);
          }
        })
      );
    });
  };

  // When all finished, show results modal and check winner guess
  useEffect(() => {
    if (raceStarted && finishOrder.length === NUM_ANIMALS) {
      setShowResultsModal(true);
      setResultCountdown(3);
      // Check if user guessed correctly
      if (selectedAnimal !== null && finishOrder[0] === selectedAnimal) {
        setShowCongratsModal(true);
      }
    }
  }, [finishOrder, raceStarted, selectedAnimal]);

  // Countdown in results modal
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showResultsModal && resultCountdown > 0) {
      interval = setInterval(() => {
        setResultCountdown((c) => c - 1);
      }, 1000);
    } else if (showResultsModal && resultCountdown === 0) {
      setShowResultsModal(false);
      setShowCongratsModal(false);
      setRaceStarted(false);
      setShowRaceUI(false);
      setSelectedAnimal(null);
      animValues.forEach(animValue => animValue.value = 0);
      // Navigate back if possible
      if (navigation && navigation.navigate) {
        navigation.navigate('Home');
      }
    }
    return () => clearInterval(interval);
  }, [showResultsModal, resultCountdown, navigation, animValues]);

  const getRankForIndex = (index: number) => {
    const pos = finishOrder.indexOf(index);
    return pos === -1 ? null : pos + 1;
  };

  return (
    <BaseLayout>
      <View style={styles.container}>
        {!showRaceUI && (
          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>Select your winning animal</Text>
            <View style={styles.selectionGrid}>
              {ANIMAL_ICONS.slice(0, NUM_ANIMALS).map((icon, idx) => {
                const isSelected = selectedAnimal === idx;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.animalSelectButton,
                      isSelected && styles.animalSelectButtonSelected,
                    ]}
                    onPress={() => setSelectedAnimal(idx)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.animalSelectIcon}>{icon}</Text>
                    <Text style={styles.animalSelectNumber}>#{idx + 1}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {/* Start button is removed as per your request */}
            {!raceStarted && (
                  <View style={styles.startButtonContainer}>
                    <TouchableOpacity style={styles.startButton} onPress={startRace}>
                      <Text style={styles.startButtonText}>START RACE</Text>
                    </TouchableOpacity>
                  </View>
                )}
          </View>
        )}

        {showRaceUI && (
          <>
            <View style={styles.startFinishContainer}>
              <Text style={styles.lineLabel}>START</Text>
              <View style={styles.startLine} />
            </View>
            <View style={styles.startFinishContainerRight}>
              <Text style={styles.lineLabel}>FINISH</Text>
              <View style={styles.finishLine}>
                <View style={styles.checkeredFinish} />
              </View>
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={!raceStarted}
            >
              {animValues.map((animValue, index) => {
                const animatedStyle = useAnimatedStyle(() => ({
                  transform: [
                    { translateX: animValue.value },
                    { scale: raceStarted ? withTiming(1.05) : 1 },
                  ],
                }));
                const rank = getRankForIndex(index);
                return (
                  <View key={index} style={styles.animalRow}>
                    <Text style={styles.animalNumber}>{index + 1}</Text>
                    <Animated.View style={[styles.animalWrapper, animatedStyle]}>
                      <Text style={styles.animalIcon}>
                        {ANIMAL_ICONS[index % ANIMAL_ICONS.length]}
                      </Text>
                    </Animated.View>
                    {rank !== null && (
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankText}>#{rank}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </>
        )}

        {/* Results Modal */}
        <Modal
          visible={showResultsModal}
          transparent
          animationType="fade"
          statusBarTranslucent
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Race Results</Text>
              <ScrollView style={styles.resultsList}>
                {finishOrder.map((index, pos) => (
                  <View key={index} style={styles.resultRow}>
                    <Text style={styles.resultRank}>#{pos + 1}</Text>
                    <Text style={styles.resultAnimal}>{ANIMAL_ICONS[index % ANIMAL_ICONS.length]}</Text>
                    <Text style={styles.resultAnimalNumber}>Animal #{index + 1}</Text>
                  </View>
                ))}
              </ScrollView>
              <Text style={styles.modalCountdown}>
                Returning to home in {resultCountdown}...
              </Text>
            </View>
          </View>
        </Modal>

        {/* Congratulation Modal */}
        <Modal
          visible={showCongratsModal}
          transparent
          animationType="fade"
          statusBarTranslucent
        >
          <View style={styles.congratsOverlay}>
            <View style={styles.congratsContent}>
              <Text style={styles.congratsText}>🎉 Congratulations! 🎉</Text>
              <Text style={styles.congratsSubText}>You guessed the winner correctly!</Text>
            </View>
          </View>
        </Modal>
      </View>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2540',
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 10,
    position: 'relative',
  },
  selectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  selectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#aad4ff',
    marginBottom: 16,
    fontFamily: 'System',
    textAlign: 'center',
  },
  selectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
  },
  animalSelectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 5 - 14,
    aspectRatio: 1,
    margin: 7,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'rgba(170, 212, 255, 0.2)',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  animalSelectButtonSelected: {
    borderColor: '#aad4ff',
    backgroundColor: '#3766bb',
  },
  animalSelectIcon: {
    fontSize: 36,
  },
  animalSelectNumber: {
    marginTop: 4,
    color: '#aad4ff',
    fontWeight: '700',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  animalRow: {
    height: ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(255,255,255,0.05)',
    borderBottomWidth: 1,
  },
  animalNumber: {
    width: 24,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
    textAlign: 'right',
    fontFamily: 'System',
  },
  animalWrapper: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animalIcon: {
    fontSize: 36,
  },
  startFinishContainer: {
    position: 'absolute',
    left: PADDING_HORIZONTAL,
    top: 10,
    alignItems: 'center',
  },
  startFinishContainerRight: {
    position: 'absolute',
    right: PADDING_HORIZONTAL,
    top: 10,
    alignItems: 'center',
  },
  lineLabel: {
    color: '#aad4ff',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 6,
    fontFamily: 'System',
  },
  startLine: {
    width: LINE_WIDTH,
    height: ROW_HEIGHT * NUM_ANIMALS,
    backgroundColor: 'rgba(170, 212, 255, 0.6)',
    borderRadius: 2,
  },
  finishLine: {
    width: LINE_WIDTH,
    height: ROW_HEIGHT * NUM_ANIMALS,
    position: 'relative',
    overflow: 'hidden',
  },
  checkeredFinish: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'solid',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 4,
    zIndex: 1,
  },
  rankBadge: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -12 }],
    backgroundColor: '#aad4ff',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  rankText: {
    color: '#0a2540',
    fontWeight: '800',
    fontSize: 14,
    fontFamily: 'System',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 37, 64, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    color: '#0a2540',
  },
  resultsList: {
    width: '100%',
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultRank: {
    fontWeight: '700',
    fontSize: 18,
    width: 40,
    color: '#0a2540',
  },
  resultAnimal: {
    fontSize: 28,
    marginRight: 12,
  },
  resultAnimalNumber: {
    fontSize: 18,
    color: '#0a2540',
  },
  modalCountdown: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a2540',
  },
  congratsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 37, 64, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  congratsContent: {
    backgroundColor: '#aad4ff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  congratsText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0a2540',
    marginBottom: 10,
  },
  congratsSubText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a2540',
  },
  startButtonContainer: {
    // position: 'absolute',
    // top: '65%',
    // left: 0,
    // right: 0,
    alignItems: 'center',
    paddingTop: 30,
    // zIndex: 20,
  },
  startButton: {
    backgroundColor: '#aad4ff',
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0a2540',
    letterSpacing: 1,
    fontFamily: 'System',
  },
});
