"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { MapPin, Play, Square, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUpdateLocation, useLocationHistory } from "@/hooks/use-device-location";
import { useCreateGeofence } from "@/hooks/use-geofences";
import type { LocationCheckResult } from "@/types/api";

const DEFAULT_ANCHOR_LAT = 10.762622;
const DEFAULT_ANCHOR_LNG = 106.660172;
const DEFAULT_RADIUS = 100;
const SIMULATION_STEP = 0.0001;

export function TrackingSimulator() {
  const [deviceId, setDeviceId] = useState("device_001");
  const [anchorLat, setAnchorLat] = useState(String(DEFAULT_ANCHOR_LAT));
  const [anchorLng, setAnchorLng] = useState(String(DEFAULT_ANCHOR_LNG));
  const [radius, setRadius] = useState(String(DEFAULT_RADIUS));
  const [deviceLat, setDeviceLat] = useState(String(DEFAULT_ANCHOR_LAT));
  const [deviceLng, setDeviceLng] = useState(String(DEFAULT_ANCHOR_LNG + 0.001));
  const [lastResult, setLastResult] = useState<LocationCheckResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateLocation = useUpdateLocation();
  const createGeofence = useCreateGeofence();
  const { data: history } = useLocationHistory(deviceId, 20);

  const handleSetupGeofence = useCallback(() => {
    createGeofence.mutate({
      device_id: deviceId,
      anchor_latitude: parseFloat(anchorLat),
      anchor_longitude: parseFloat(anchorLng),
      radius_meters: parseFloat(radius),
    });
  }, [createGeofence, deviceId, anchorLat, anchorLng, radius]);

  const handleSendLocation = useCallback(() => {
    updateLocation.mutate(
      {
        device_id: deviceId,
        latitude: parseFloat(deviceLat),
        longitude: parseFloat(deviceLng),
      },
      {
        onSuccess: (result) => setLastResult(result),
      }
    );
  }, [updateLocation, deviceId, deviceLat, deviceLng]);

  const simulationTick = useCallback(() => {
    setDeviceLng((prev) => {
      const val = parseFloat(prev) + SIMULATION_STEP * direction;
      return String(val.toFixed(6));
    });
  }, [direction]);

  useEffect(() => {
    if (isSimulating) {
      intervalRef.current = setInterval(() => {
        simulationTick();
      }, 2000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating, simulationTick]);

  useEffect(() => {
    if (!isSimulating) return;
    handleSendLocation();
  }, [isSimulating, deviceLng, handleSendLocation]);

  const handleToggleSimulation = () => {
    if (isSimulating) {
      setIsSimulating(false);
    } else {
      handleSetupGeofence();
      setIsSimulating(true);
    }
  };

  const handleReset = () => {
    setIsSimulating(false);
    setDeviceLat(String(DEFAULT_ANCHOR_LAT));
    setDeviceLng(String(DEFAULT_ANCHOR_LNG + 0.001));
    setLastResult(null);
    setDirection(1);
  };

  const locations = history?.locations ?? [];
  const recentUnsafe = locations.filter((l) => !l.is_safe);

  return (
    <div className="flex flex-col gap-5 h-full min-h-0">
      <h1 className="text-xl font-bold text-[#0F172A] shrink-0">
        Theo dõi vị trí thiết bị đeo tay
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 flex-1 min-h-0 overflow-auto">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={16} className="text-[#0D9488]" />
                Cấu hình vùng an toàn (Geofence)
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-medium text-[#64748B]">Mã thiết bị</label>
                <Input value={deviceId} onChange={(e) => setDeviceId(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-[#64748B]">Vị trí mốc (Vĩ độ)</label>
                  <Input value={anchorLat} onChange={(e) => setAnchorLat(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#64748B]">Vị trí mốc (Kinh độ)</label>
                  <Input value={anchorLng} onChange={(e) => setAnchorLng(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[#64748B]">Bán kính an toàn (mét)</label>
                <Input value={radius} onChange={(e) => setRadius(e.target.value)} />
              </div>
              <Button
                onClick={handleSetupGeofence}
                disabled={createGeofence.isPending}
                className="w-full bg-[#0D9488] hover:bg-teal-700 text-white"
              >
                {createGeofence.isPending ? "Đang tạo..." : "Tạo / Cập nhật vùng an toàn"}
              </Button>
              {createGeofence.isSuccess && (
                <p className="text-xs text-green-600">
                  Vùng an toàn đã được {createGeofence.data.status === "created" ? "tạo" : "cập nhật"} thành công!
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send size={16} className="text-[#0D9488]" />
                Giả lập vị trí thiết bị
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-[#64748B]">Vĩ độ thiết bị</label>
                  <Input value={deviceLat} onChange={(e) => setDeviceLat(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#64748B]">Kinh độ thiết bị</label>
                  <Input value={deviceLng} onChange={(e) => setDeviceLng(e.target.value)} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSendLocation}
                  disabled={updateLocation.isPending}
                  className="flex-1 bg-[#0D9488] hover:bg-teal-700 text-white"
                >
                  <Send size={14} />
                  Gửi vị trí
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleToggleSimulation}
                  variant={isSimulating ? "destructive" : "default"}
                  className="flex-1"
                >
                  {isSimulating ? (
                    <>
                      <Square size={14} /> Dừng giả lập
                    </>
                  ) : (
                    <>
                      <Play size={14} /> Bắt đầu giả lập
                    </>
                  )}
                </Button>
                <Button onClick={() => setDirection((d) => -d)} variant="outline" title="Đổi hướng di chuyển">
                  <RotateCcw size={14} />
                </Button>
                <Button onClick={handleReset} variant="outline" title="Đặt lại">
                  <RotateCcw size={14} />
                </Button>
              </div>
              {isSimulating && (
                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Đang giả lập — thiết bị di chuyển {direction > 0 ? "về phía đông" : "về phía Tây"}...
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái hiện tại</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {lastResult ? (
                <>
                  <div className="flex items-center justify-center p-6 rounded-xl">
                    <div
                      className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${
                        lastResult.is_safe
                          ? "bg-green-100 border-4 border-green-400 shadow-lg shadow-green-200"
                          : "bg-red-100 border-4 border-red-500 shadow-lg shadow-red-200 animate-pulse"
                      }`}
                    >
                      <MapPin
                        size={32}
                        className={lastResult.is_safe ? "text-green-600" : "text-red-600"}
                      />
                      <span
                        className={`text-sm font-bold mt-1 ${
                          lastResult.is_safe ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {lastResult.is_safe ? "AN TOÀN" : "CẢNH BÁO"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-[#F8FAFC] rounded-lg p-3">
                      <p className="text-[#64748B] text-xs">Khoảng cách</p>
                      <p className="font-bold text-[#0F172A]">{lastResult.distance_meters.toFixed(1)}m</p>
                    </div>
                    <div className="bg-[#F8FAFC] rounded-lg p-3">
                      <p className="text-[#64748B] text-xs">Giới hạn</p>
                      <p className="font-bold text-[#0F172A]">{lastResult.radius_meters}m</p>
                    </div>
                    <div className="bg-[#F8FAFC] rounded-lg p-3">
                      <p className="text-[#64748B] text-xs">Vị trí thiết bị</p>
                      <p className="font-bold text-[#0F172A] text-xs">
                        {lastResult.latitude.toFixed(6)}, {lastResult.longitude.toFixed(6)}
                      </p>
                    </div>
                    <div className="bg-[#F8FAFC] rounded-lg p-3">
                      <p className="text-[#64748B] text-xs">Vị trí mốc</p>
                      <p className="font-bold text-[#0F172A] text-xs">
                        {lastResult.anchor_latitude.toFixed(6)}, {lastResult.anchor_longitude.toFixed(6)}
                      </p>
                    </div>
                  </div>

                  {!lastResult.is_safe && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 text-center font-medium">
                      THIẾT BỊ ĐÃ RA NGOÀI VÙNG AN TOÀN!
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-[#64748B]">
                  <MapPin size={48} className="opacity-30 mb-2" />
                  <p className="text-sm">Chưa có dữ liệu. Gửi vị trí để kiểm tra.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="flex-1 min-h-[300px]">
            <CardHeader>
              <CardTitle>Bản đồ vị trí</CardTitle>
            </CardHeader>
            <CardContent>
              <LocationMap
                anchorLat={parseFloat(anchorLat) || DEFAULT_ANCHOR_LAT}
                anchorLng={parseFloat(anchorLng) || DEFAULT_ANCHOR_LNG}
                radius={parseFloat(radius) || DEFAULT_RADIUS}
                deviceLat={parseFloat(deviceLat) || 0}
                deviceLng={parseFloat(deviceLng) || 0}
                isSafe={lastResult?.is_safe ?? true}
                locations={locations}
              />
            </CardContent>
          </Card>
        </div>

        <Card className="flex flex-col min-h-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lịch sử vị trí</span>
              {recentUnsafe.length > 0 && (
                <Badge variant="destructive">{recentUnsafe.length} cảnh báo</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-2">
              {locations.length === 0 ? (
                <p className="text-sm text-[#64748B] text-center py-8">
                  Chưa có lịch sử vị trí
                </p>
              ) : (
                locations.map((loc) => (
                  <div
                    key={loc.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      loc.is_safe
                        ? "bg-white border-[#E2E8F0]"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full shrink-0 ${
                        loc.is_safe ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#0F172A]">
                          {loc.latitude.toFixed(6)}, {loc.longitude.toFixed(6)}
                        </span>
                        <Badge variant={loc.is_safe ? "default" : "destructive"} className="text-[10px] px-1.5">
                          {loc.is_safe ? "An toàn" : "Ngoài vùng"}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        {loc.distance_meters != null
                          ? `${loc.distance_meters.toFixed(1)}m`
                          : ""}{" "}
                        — {loc.created_at ? new Date(loc.created_at).toLocaleTimeString("vi-VN") : ""}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LocationMap({
  anchorLat,
  anchorLng,
  radius,
  deviceLat,
  deviceLng,
  isSafe,
  locations,
}: {
  anchorLat: number;
  anchorLng: number;
  radius: number;
  deviceLat: number;
  deviceLng: number;
  isSafe: boolean;
  locations: { latitude: number; longitude: number; is_safe: boolean }[];
}) {
  const allPoints = [
    { lat: anchorLat, lng: anchorLng },
    { lat: deviceLat, lng: deviceLng },
    ...locations.slice(0, 10).map((l) => ({ lat: l.latitude, lng: l.longitude })),
  ].filter((p) => p.lat !== 0 || p.lng !== 0);

  const minLat = Math.min(...allPoints.map((p) => p.lat));
  const maxLat = Math.max(...allPoints.map((p) => p.lat));
  const minLng = Math.min(...allPoints.map((p) => p.lng));
  const maxLng = Math.max(...allPoints.map((p) => p.lng));

  const padding = 0.002;
  const latRange = (maxLat - minLat + padding * 2) || 0.01;
  const lngRange = (maxLng - minLng + padding * 2) || 0.01;
  const mapRange = Math.max(latRange, lngRange);
  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  const toX = (lng: number) => ((lng - centerLng) / mapRange + 0.5) * 100;
  const toY = (lat: number) => (0.5 - (lat - centerLat) / mapRange) * 100;

  const radiusDeg = radius / 111320;

  return (
    <div className="relative w-full h-64 bg-[#F0FDFA] border border-[#E2E8F0] rounded-lg overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <circle
          cx={toX(anchorLng)}
          cy={toY(anchorLat)}
          r={(radiusDeg / mapRange) * 100}
          fill="rgba(13, 148, 136, 0.1)"
          stroke="#0D9488"
          strokeWidth="0.3"
          strokeDasharray="1,1"
        />
        <circle
          cx={toX(anchorLng)}
          cy={toY(anchorLat)}
          r="1"
          fill="#0D9488"
        />
        <text x={toX(anchorLng)} y={toY(anchorLat) - 2} textAnchor="middle" fontSize="2.5" fill="#0D9488" fontWeight="bold">
          Mốc
        </text>

        {locations.slice(0, 10).map((loc, i) => (
          <circle
            key={i}
            cx={toX(loc.longitude)}
            cy={toY(loc.latitude)}
            r="0.8"
            fill={loc.is_safe ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}
          />
        ))}

        <circle
          cx={toX(deviceLng)}
          cy={toY(deviceLat)}
          r="2"
          fill={isSafe ? "#22C55E" : "#EF4444"}
          stroke="white"
          strokeWidth="0.5"
        />
        <text x={toX(deviceLng)} y={toY(deviceLat) - 3} textAnchor="middle" fontSize="2.5" fill={isSafe ? "#16A34A" : "#DC2626"} fontWeight="bold">
          TB
        </text>

        <line
          x1={toX(anchorLng)}
          y1={toY(anchorLat)}
          x2={toX(deviceLng)}
          y2={toY(deviceLat)}
          stroke={isSafe ? "#22C55E" : "#EF4444"}
          strokeWidth="0.3"
          strokeDasharray="1,1"
        />
      </svg>

      <div className="absolute bottom-2 left-2 flex gap-3 text-[10px] text-[#64748B]">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-[#0D9488] rounded-full" /> Mốc
        </span>
        <span className="flex items-center gap-1">
          <span className={`w-2 h-2 ${isSafe ? "bg-green-500" : "bg-red-500"} rounded-full`} />
          Thiết bị
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 border border-[#0D9488] bg-[#0D9488]/10 rounded-full" />
          Vùng an toàn
        </span>
      </div>
    </div>
  );
}
