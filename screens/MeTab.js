import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";

import HeaderPersonalProfile from "../components/header/HeaderPersonalProfile";
import { UserContext } from "../context/UserContext";

const MeTab = () => {
  const { user } = useContext(UserContext);
  const userData = useMemo(() => user, [user]);
  return (
    <View style={styles.container}>
      <HeaderPersonalProfile />
      <View style={styles.headerBackground} />

      {/* Tài khoản */}
      <View style={styles.profileContainer}>
        <Image
          source={
            userData?.avatar_path
              ? { uri: userData.avatar_path }
              : require("../assets/icons/cloud.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{userData.full_name}</Text>
        <Text style={styles.updateText}>Cập nhật tiểu sử</Text>
      </View>

      {/* Lọc nội dung đăng tải */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Image
            source={require("../assets/icons/image.png")}
            style={styles.icon}
          />
          <Text>Hình ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Image
            source={require("../assets/icons/video.png")}
            style={styles.icon}
          />
          <Text>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Image
            source={require("../assets/icons/heart.png")}
            style={styles.icon}
          />
          <Text>Nhiều yêu thích</Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung đăng tải */}
      <View style={styles.postContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Suy nghĩ của bạn là gì?"
          />
          <TouchableOpacity>
            <Image
              source={require("../assets/icons/image.png")}
              style={styles.iconSmall}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.noPostContainer}>
          <Text style={styles.noPostText}>Không có bài đăng nào.</Text>
        </View>
      </View>
    </View>
  );
};

// 📌 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
  },
  headerBackground: {
    height: 80,
    width: "100%",
    backgroundColor: "rgba(217, 217, 217, 0.5)",
  },
  profileContainer: {
    alignItems: "center",
    gap: 10,
    top: -50,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  updateText: {
    color: "blue",
  },
  filterContainer: {
    top: -30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 5,
    backgroundColor: "rgba(217, 217, 217, 0.5)",
    borderRadius: 10,
    justifyContent: "center",
    width: 110, // Sửa lỗi width
  },
  icon: {
    width: 30,
    height: 30,
  },
  postContainer: {
    top: -10,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "rgba(217, 217, 217, 0.5)",
  },
  input: {
    fontSize: 16,
    flex: 1, // Sửa lỗi hiển thị placeholder
  },
  iconSmall: {
    width: 25,
    height: 25,
  },
  noPostContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  noPostText: {
    color: "gray",
  },
});

export default MeTab;
