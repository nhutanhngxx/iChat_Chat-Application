import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import CustomButton from "../components/common/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { NetworkInfo } from "react-native-network-info";

const LoginScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    NetworkInfo.getIPAddress().then((ip) => {
      setIpAddress(ip);
    });
  }, []);

  const API_iChat = "http://192.168.1.186:5001";

  const handleLogin = async () => {
    if (!phone.trim() || !password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại và mật khẩu!");
      return;
    }

    setLoading(true); // Bắt đầu loading
    try {
      const response = await axios.post(`${API_iChat}/login`, {
        phone,
        password,
      });

      const { accessToken, user } = response.data;

      await AsyncStorage.setItem("token", accessToken);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      Alert.alert("Đăng nhập thành công!", `Chào mừng ${user.full_name}`);
      navigation.replace("Home");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "Có lỗi xảy ra! Vui lòng thử lại.";
      Alert.alert("Lỗi", errorMessage);
    } finally {
      setLoading(false); // Dừng loading
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.title}>iChat</Text>
            <View style={styles.content}>
              <Text style={styles.label}>Đăng nhập</Text>
              <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Text
                onPress={() => alert("Quên mật khẩu?")}
                style={styles.forgotPassword}
              >
                Quên mật khẩu?
              </Text>
            </View>
          </View>
          <View style={{ gap: 20 }}>
            {loading ? (
              <ActivityIndicator size="large" color="#48A2FC" />
            ) : (
              <CustomButton
                title="Đăng nhập"
                onPress={handleLogin}
                backgroundColor={"#48A2FC"}
              />
            )}
          </View>
        </View>

        <View style={{ position: "absolute", bottom: 20, alignSelf: "center" }}>
          <Text
            style={styles.question}
            onPress={() => alert("Những câu hỏi thường gặp")}
          >
            Những câu hỏi thường gặp
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    height: 350,
  },
  label: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 40,
  },
  input: {
    width: 300,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#D9D9D9",
  },
  forgotPassword: {
    fontWeight: "bold",
    color: "#0C098C",
    fontSize: 16,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  title: {
    fontSize: 70,
    color: "#131058",
    fontWeight: "bold",
  },
  question: {
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginScreen;
