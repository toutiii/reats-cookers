import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AuthState } from "./slices/auth";

const AUTH_STORAGE_KEY = "@reats_cookers_auth";

// Fields to persist (exclude transient state)
type PersistedAuthState = Pick<
  AuthState,
  | "isAuthenticated"
  | "accessToken"
  | "refreshToken"
  | "userId"
  | "cooker"
  | "isFirstLaunch"
  | "lastLoginAt"
  | "status"
>;

export const persistAuth = async (state: AuthState): Promise<void> => {
  try {
    const stateToPersist: PersistedAuthState = {
      isAuthenticated: state.isAuthenticated,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      userId: state.userId,
      cooker: state.cooker,
      isFirstLaunch: state.isFirstLaunch,
      lastLoginAt: state.lastLoginAt,
      status: state.isAuthenticated ? "authenticated" : "idle",
    };
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(stateToPersist));
  } catch (error) {
    console.error("Failed to persist auth state:", error);
  }
};

export const loadPersistedAuth = async (): Promise<Partial<AuthState> | null> => {
  try {
    const storedState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    if (storedState) {
      return JSON.parse(storedState);
    }
    return null;
  } catch (error) {
    console.error("Failed to load persisted auth state:", error);
    return null;
  }
};

export const clearPersistedAuth = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear persisted auth state:", error);
  }
};
