import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Platform } from 'react-native';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';
import { ChatInterface } from './components/ChatInterface';
import { ApiKeyInput } from './components/ApiKeyInput';

const CubeScreen: React.FC = () => {
  const [currentFace, setCurrentFace] = useState('front'); // Default to Front (index 1)
  const cubeRef = useRef<any>(null);


  const handleSwipe = (position: number, index: number) => {
    console.log('Swiped to position:', position, 'index:', index);
    switch (index) {
      case 0:
        setCurrentFace('left');
        break;
      case 1:
        setCurrentFace('front');
        break;
      case 2:
        setCurrentFace('right');
        break;
      default:
        setCurrentFace('front'); // Default to front for safety
    }
  };

  // Order the faces to match 3D cube layout:
  // - Index 0: Left (settings, to the left of front)
  // - Index 1: Front (main story)
  // - Index 2: Right (inventory, to the right of front)
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={[styles.safeArea, styles.frontFace]}>
        <View style={styles.container}>
          <CubeNavigationHorizontal
            ref={cubeRef}
            callBackAfterSwipe={handleSwipe}
            // Optional props to customize animation or speed if needed
            swipeThreshold={50} // Adjust swipe sensitivity if needed
            expandView={true}
            loop={false}
          >
            {/* Left face - Settings & API Keys */}
            <View style={[styles.face, styles.leftFace]}>
              <ApiKeyInput />
            </View>

            {/* Front face - Chat Interface - Default View on Startup */}
            <View style={[styles.face, styles.frontFace]}>
              <ChatInterface />
            </View>

            {/* Right face - Inventory and Game extra game UI (placeholder) */}
            <View style={[styles.face, styles.rightFace]}>
              <Text style={styles.faceText}>Right Face - Inventory</Text>
            </View>
          </CubeNavigationHorizontal>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#007AFF', // Match the front face color
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Additional padding for Android
  },
  container: {
    flex: 1,
  },
  face: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frontFace: {
    backgroundColor: 'grey', // Bright blue
  },
  leftFace: {
    backgroundColor: '#4CAF50', // Green
  },
  rightFace: {
    backgroundColor: '#FF9800', // Orange
  },
  faceText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CubeScreen;