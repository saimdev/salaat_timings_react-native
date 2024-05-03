import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import BleManager from "react-native-ble-manager";

const Bluetooth = () => {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    // BleManager.start({ showAlert: true });
    start();
  }, []);

  const start = async () => {
    await BleManager.start({ showAlert: false });
  };

  const scanAndConnect = () => {
    BleManager.scan([], 5, true)
      .then((results) => {
        const foundDevice = results.find(
          (device) => device.name === "YourDeviceName"
        );
        if (foundDevice) {
          BleManager.connect(foundDevice.id)
            .then(() => {
              console.log("Connected to device:", foundDevice);
              setConnected(true);
              setDevice(foundDevice);
            })
            .catch((error) => {
              console.error("Connection error:", error);
            });
        } else {
          console.warn("Device not found");
        }
      })
      .catch((error) => {
        console.error("Scan error:", error);
      });
  };

  const sendData = () => {
    if (connected) {
      const data = "Your data to send";
      BleManager.write(
        device.id,
        "Your service UUID",
        "Your characteristic UUID",
        data
      )
        .then(() => {
          console.log("Data sent successfully");
        })
        .catch((error) => {
          console.error("Send error:", error);
        });
    } else {
      console.warn("Not connected to any device");
    }
  };

  return (
    <View>
      <Text>Bluetooth Component</Text>
      <Button title="Scan and Connect" onPress={scanAndConnect} />
      <Button title="Send Data" onPress={sendData} />
    </View>
  );
};

export default Bluetooth;
