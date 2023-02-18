import React, { useRef, useState, useEffect,useContext } from "react";
import { Camera,CameraType } from "expo-camera";
import styled from "styled-components/native";
import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

export const CameraScreen = ({ navigation })  => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
   
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted");
      console.log(hasPermission)
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();

      //กลับภาพจากซ้ายไปขวา
      const flipImage = await manipulateAsync(
        photo.localUri || photo.uri,
        [{ rotate: 180 }, { flip: FlipType.Vertical }],
        { compress: 1, format: SaveFormat.PNG }
      );

      AsyncStorage.setItem(`${user.uid}-photo`, flipImage.uri);
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={snap}>
    <ProfileCamera
      ref={(camera) => (cameraRef.current = camera)}
      type={Camera.Constants.Type.front}
      ratio={"16:9"}
    />
  </TouchableOpacity>
  );
};

