import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';

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
  // - Index 0: Front (main story)
  // - Index 1: Left (settings, to the left of front)
  // - Index 2: Right (inventory, to the right of front)
  return (
    <View style={styles.container}>
      <CubeNavigationHorizontal
        ref={cubeRef}
        callBackAfterSwipe={handleSwipe}
        // Optional props to customize animation or speed if needed
        swipeThreshold={50} // Adjust swipe sensitivity if needed
      >
        <View style={[styles.face, styles.frontFace]}>
          <Text style={styles.faceText}>Left Face - Settings</Text>
        </View>
        <View style={[styles.face, styles.leftFace]}>
          <Text style={styles.faceText}>Front Face - Main Story</Text>
        </View>
        <View style={[styles.face, styles.rightFace]}>
          <Text style={styles.faceText}>Right Face - Inventory</Text>
        </View>
      </CubeNavigationHorizontal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#007AFF', // Bright blue
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