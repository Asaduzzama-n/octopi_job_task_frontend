import { decodeToken } from "@/utils/jwt";
import { instance as axiosInstance } from "@/lib/axios";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  // console.log(accessToken, "user info");
  return setToLocalStorage("accessToken", accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage("accessToken");
  // console.log(authToken);
  if (authToken) {
    const decodedData = decodeToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage("accessToken");

  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

// export const getNewAccessToken = async () => {
//   return await axiosInstance({
//     url: "/auth/refresh-token",
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     withCredentials: true,
//   });
// };
