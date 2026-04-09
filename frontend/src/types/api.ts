export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  id: number;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: number;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  message?: string;
  error?: string;
}

export interface EventCreateRequest {
  camera_id: number;
  timestamp: string;
  event_type: string;
  confidence: number;
  url: string;
}

export interface EventResponse {
  status: string;
  message: string;
  push: {
    status: string;
    onesignal?: Record<string, unknown>;
    reason?: string;
  };
}

export interface LostEventCreateRequest {
  timestamp: string;
  event_type: string;
  anchor_url: string;
  current_url: string;
  distance: number;
}

export interface CameraCreateRequest {
  user_id: number;
  camera_name: string;
}

export interface CameraCreateResponse {
  status: string;
  camera: {
    id: number;
    name: string;
  };
}

export interface GeofenceCreateRequest {
  device_id: string;
  anchor_latitude: number;
  anchor_longitude: number;
  radius_meters: number;
}

export interface GeofenceData {
  id: number;
  device_id: string;
  anchor_latitude: number;
  anchor_longitude: number;
  radius_meters: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface GeofenceUpsertResponse {
  status: string;
  geofence: GeofenceData;
}

export interface NotifyUserResponse {
  status: string;
  user_id: number;
  device_count?: number;
  message: string;
  onesignal?: Record<string, unknown>;
  error?: string;
}

export interface NotifyAllResponse {
  status: string;
  onesignal: Record<string, unknown>;
  message: string;
}

export interface RegisterDeviceRequest {
  user_id: number;
  player_id: string;
}

export interface RegisterDeviceResponse {
  status: string;
  player_id: string;
  user_id: number;
}

export interface RemoveDeviceResponse {
  status: string;
  error?: string;
}

export interface LocationUpdateRequest {
  device_id: string;
  latitude: number;
  longitude: number;
}

export interface LocationCheckResult {
  device_id: string;
  latitude: number;
  longitude: number;
  anchor_latitude: number;
  anchor_longitude: number;
  distance_meters: number;
  radius_meters: number;
  is_safe: boolean;
  message: string;
}

export interface LocationHistoryItem {
  id: number;
  device_id: string;
  latitude: number;
  longitude: number;
  distance_meters: number | null;
  is_safe: boolean;
  created_at: string | null;
}

export interface LocationHistoryResponse {
  device_id: string;
  total: number;
  locations: LocationHistoryItem[];
}

export interface ApiError {
  detail: string;
}
